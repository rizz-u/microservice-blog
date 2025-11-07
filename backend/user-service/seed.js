const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require('bcryptjs')

const MONGO = process.env.MONGO_URL || 'mongodb://mongo-user:27017/userdb'

async function run() {
  await mongoose.connect(MONGO, {})
  console.log('Connected to mongo for seeding')
  await User.deleteMany({})
  const pass = await bcrypt.hash('password', 10)
  await User.create({ email: 'alice@example.com', name: 'Alice', passwordHash: pass, role: 'admin' })
  await User.create({ email: 'bob@example.com', name: 'Bob', passwordHash: pass })
  console.log('Seeded users')
  process.exit(0)
}

run().catch(err => { console.error(err); process.exit(1) })
