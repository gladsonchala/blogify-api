const Post = require('../models/Post');

// Create a new blog post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Get the authenticated user ID from the request
    const userId = req.user._id;

    // Create a new post instance
    const post = new Post({
      title,
      content,
      author: userId,
    });

    // Save the post to the database
    await post.save();

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the post' });
  }
};

module.exports = {
  createPost,
};
