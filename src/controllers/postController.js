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

// Get all blog posts
const getAllPosts = async (req, res) => {
  try {
    // Find all posts and populate the author field with user details
    const posts = await Post.find().populate('author', 'name email');

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the posts' });
  }
};

// Get a specific blog post by ID
const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post by ID and populate the author field with user details
    const post = await Post.findById(postId).populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the post' });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
};

// Update a blog post by ID
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update the post fields
    post.title = title || post.title;
    post.content = content || post.content;

    // Save the updated post to the database
    await post.save();

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the post' });
  }
};

module.exports = {
  updatePost,
};


// Delete a blog post by ID
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete the post
    await post.remove();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
};

module.exports = {
  deletePost,
};
