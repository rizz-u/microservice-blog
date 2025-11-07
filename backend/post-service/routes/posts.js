const express = require('express')
const router = express.Router()
const Joi = require('joi')
const Post = require('../models/post')
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

const createSchema = Joi.object({ title: Joi.string().min(3).required(), body: Joi.string().min(3).required(), tags: Joi.array().items(Joi.string()).optional() })

// List with pagination & sorting
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || '10')))
    const sort = req.query.sort === 'newest' ? { createdAt: -1 } : { createdAt: 1 }
    const skip = (page - 1) * limit
    const items = await Post.find().sort(sort).skip(skip).limit(limit)
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
    const post = new Post({ ...value, authorId: req.user.sub })
    await post.save()
    res.status(201).json(post)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal error' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Not found' })
    res.json(post)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal error' })
  }
})

router.put('/:id', validateJWT, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Not found' })
    if (post.authorId !== req.user.sub && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
    Object.assign(post, req.body)
    await post.save()
    res.json(post)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal error' })
  }
})

router.delete('/:id', validateJWT, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Not found' })
    if (post.authorId !== req.user.sub && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
    await post.deleteOne()
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal error' })
  }
})

module.exports = router
