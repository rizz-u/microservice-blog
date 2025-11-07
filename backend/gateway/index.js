const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const morgan = require('morgan')
const { createServiceEndpoints } = require('./lib/circuit-breaker')
const { v4: uuidv4 } = require('uuid')

const PORT = process.env.PORT || 8080

const app = express()
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-correlation-id']
}))
app.use(express.json({ limit: '100kb' }))
app.use(morgan('combined'))

// Simple correlation ID middleware
app.use((req, res, next) => {
  req.correlationId = req.headers['x-correlation-id'] || uuidv4()
  res.setHeader('x-correlation-id', req.correlationId)
  next()
})

// Rate limiter
const limiter = rateLimit({ windowMs: 1000 * 10, max: 100 })
app.use(limiter)

// No authentication middleware needed

// Initialize service endpoints with circuit breakers and retries
const services = createServiceEndpoints();

// Proxy options helper using circuit breaker for health checks
function createServiceProxy(target, serviceName) {
  const service = services[serviceName];

  // Use http-proxy-middleware for normal proxying, with circuit breaker for health checks
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace(/^\/api\/v1/, ''),
    onProxyReq: (proxyReq, req, res) => {
      // forward correlation id
      proxyReq.setHeader('x-correlation-id', req.correlationId)
    },
    onError: (err, req, res) => {
      res.status(502).json({ message: 'Bad gateway', detail: err.message })
    }
  })
}

// Public routes
app.get('/health', (req, res) => res.json({ status: 'ok', time: Date.now() }))

// Health check endpoints using circuit breaker
app.get('/api/v1/users/health', async (req, res) => {
  try {
    const response = await services.user.request({ method: 'get', url: '/health' });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(503).json({ status: 'error', message: 'Service unavailable' });
  }
});

app.get('/api/v1/posts/health', async (req, res) => {
  try {
    const response = await services.post.request({ method: 'get', url: '/health' });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(503).json({ status: 'error', message: 'Service unavailable' });
  }
});

app.get('/api/v1/comments/health', async (req, res) => {
  try {
    const response = await services.comment.request({ method: 'get', url: '/health' });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(503).json({ status: 'error', message: 'Service unavailable' });
  }
});

// Mount proxies
app.use('/api/v1/users', createServiceProxy('http://user:3001', 'user'))
app.use('/api/v1/posts', createServiceProxy('http://post:3002', 'post'))
app.use('/api/v1/comments', createServiceProxy('http://comment:3003', 'comment'))

// Allow unauthenticated call to auth token route on user service
app.use('/api/v1/auth', createServiceProxy('http://user:3001', 'user'))

app.listen(PORT, () => {
  console.log(`Gateway listening on ${PORT}`)
})
