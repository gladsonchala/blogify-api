const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the Post schema
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Post model using the schema
const Post = mongoose.model('Post', postSchema);

// Export the Post model
module.exports = Post;
