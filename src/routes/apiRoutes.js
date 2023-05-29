const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Blog users routes
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', authController.verifyToken, userController.updateUser);
router.delete('/users/:id', authController.verifyToken, userController.deleteUser);

// Blog post routes
router.post('/posts', authController.verifyToken, postController.createPost);
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', authController.verifyToken, postController.updatePost);
router.delete('/posts/:id', authController.verifyToken, postController.deletePost);

module.exports = router;
