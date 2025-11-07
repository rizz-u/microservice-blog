const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')

const app = express()
const PORT = process.env.PORT || 3001
const MONGO = process.env.MONGO_URL || 'mongodb://mongo-user:27017/userdb'

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '100kb' }))
app.use(morgan('combined'))

app.get('/health', (req, res) => res.json({ status: 'ok' }))
app.get('/metrics', (req, res) => res.json({ uptime: process.uptime() }))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)

mongoose.connect(MONGO, {})
  .then(() => {
    app.listen(PORT, () => console.log(`User service listening on ${PORT}`))
  })
  .catch(err => {
    console.error('DB connect error', err)
    process.exit(1)
  })
