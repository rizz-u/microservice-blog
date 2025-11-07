const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const postsRoutes = require('./routes/posts')

const app = express()
const PORT = process.env.PORT || 3002
const MONGO = process.env.MONGO_URL || 'mongodb://mongo-post:27017/postdb'

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '100kb' }))
app.use(morgan('combined'))

app.get('/health', (req, res) => res.json({ status: 'ok' }))
app.get('/metrics', (req, res) => res.json({ uptime: process.uptime() }))

app.use('/api/v1/posts', postsRoutes)

mongoose.connect(MONGO, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Post service listening on ${PORT}`))
  })
  .catch(err => {
    console.error('DB connect error', err)
    process.exit(1)
  })
