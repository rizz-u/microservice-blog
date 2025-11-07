const express = require('express')
const router = express.Router()
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

const registerSchema = Joi.object({ 
  email: Joi.string().email().required(), 
  name: Joi.string().min(2).required(), 
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin').default('user')
})
const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() })

router.post('/register', async (req, res) => {
  const { error, value } = registerSchema.validate(req.body)
  if (error) return res.status(400).json({ message: error.message })
  const { email, name, password, role } = value
  try {
    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ message: 'Email already in use' })
    const passwordHash = await bcrypt.hash(password, 12)
    const user = new User({ email, name, passwordHash, role })
    await user.save()
    const token = jwt.sign({ sub: user._id.toString(), role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal error' })
  }
})

router.post('/login', async (req, res) => {
  const { error, value } = loginSchema.validate(req.body)
  if (error) return res.status(400).json({ message: error.message })
  const { email, password } = value
  try {
    const user = await User.findOne({ email }).lean()
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ sub: user._id.toString(), role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal error' })
  }
})

module.exports = router
