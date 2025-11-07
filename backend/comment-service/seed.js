const mongoose = require('mongoose')
const Comment = require('./models/comment')

const MONGO = process.env.MONGO_URL || 'mongodb://mongo-comment:27017/commentdb'

async function run() {
  await mongoose.connect(MONGO, {})
  console.log('Connected to mongo for seeding comments')
  await Comment.deleteMany({})
  await Comment.create({ postId: 'welcome', authorId: 'system', body: 'First comment' })
  console.log('Seeded comments')
  process.exit(0)
}

run().catch(err => { console.error(err); process.exit(1) })
