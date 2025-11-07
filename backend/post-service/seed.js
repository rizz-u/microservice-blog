const mongoose = require('mongoose')
const Post = require('./models/post')

const MONGO = process.env.MONGO_URL || 'mongodb://mongo-post:27017/postdb'

async function run() {
  await mongoose.connect(MONGO, {})
  console.log('Connected to mongo for seeding posts')
  await Post.deleteMany({})
  await Post.create({ title: 'Welcome', body: 'Welcome to the Post Service', authorId: 'system', tags: ['intro'] })
  console.log('Seeded posts')
  process.exit(0)
}

run().catch(err => { console.error(err); process.exit(1) })
