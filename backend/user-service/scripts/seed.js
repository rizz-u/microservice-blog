const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://mongo:27017/userdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    // Clear existing users
    await User.deleteMany({})

    // Create admin user
    const adminPasswordHash = await bcrypt.hash('admin@123', 12)
    await User.create({
      email: 'admin@example.com',
      name: 'Admin User',
      passwordHash: adminPasswordHash,
      role: 'admin'
    })

    // Create regular user
    const userPasswordHash = await bcrypt.hash('user@123', 12)
    await User.create({
      email: 'user@example.com',
      name: 'Regular User',
      passwordHash: userPasswordHash,
      role: 'user'
    })

    console.log('Seed completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  }
}

seed()