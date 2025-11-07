const express = require('express')
const router = express.Router()
const Joi = require('joi')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

function validateJWT(req, res, next) {
  const auth = req.headers['authorization']
  if (!auth) return res.status(401).json({ message: 'No authorization header' })
  const parts = auth.split(' ')
  if (parts.length !== 2) return res.status(401).json({ message: 'Invalid auth header' })
  const token = parts[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

const createSchema = Joi.object({ postId: Joi.string().required(), body: Joi.string().min(1).required() })

router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || '10')))
    const skip = (page - 1) * limit
    const items = await Comment.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
    res.json({ items, page, limit })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal error' })
  }
})

router.post('/', validateJWT, async (req, res) => {
  const { error, value } = createSchema.validate(req.body)
  if (error) return res.status(400).json({ message: error.message })
  try {
    const comment = new Comment({ ...value, authorId: req.user.sub })
    await comment.save()
    res.status(201).json(comment)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal error' })
  }
})

module.exports = router
