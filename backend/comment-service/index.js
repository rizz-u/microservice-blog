const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const commentsRoutes = require('./routes/comments')

const app = express()
const PORT = process.env.PORT || 3003
const MONGO = process.env.MONGO_URL || 'mongodb://mongo-comment:27017/commentdb'

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '100kb' }))
app.use(morgan('combined'))

app.get('/health', (req, res) => res.json({ status: 'ok' }))
app.get('/metrics', (req, res) => res.json({ uptime: process.uptime() }))

app.use('/api/v1/comments', commentsRoutes)

mongoose.connect(MONGO, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Comment service listening on ${PORT}`))
  })
  .catch(err => {
    console.error('DB connect error', err)
    process.exit(1)
  })
