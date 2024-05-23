const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', blogController.getBlogs); // Get all blog posts
router.post('/', authMiddleware, blogController.createBlog); // Create a new blog post
router.get('/:id', blogController.getBlogById); // Get details of a specific blog post
router.put('/:id', authMiddleware, blogController.updateBlog); // Update details of a specific blog post
router.delete('/:id', authMiddleware, blogController.deleteBlog); // Delete a specific blog post

module.exports = router;
