const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  postId: { type: String, required: true, index: true },
  authorId: { type: String, required: true, index: true },
  body: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Comment', CommentSchema)
