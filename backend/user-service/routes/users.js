const express = require('express')
const router = express.Router()
const User = require('../models/user')
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

router.get('/me', validateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.sub).select('-passwordHash')
    if (!user) return res.status(404).json({ message: 'Not found' })
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal error' })
  }
})

module.exports = router
