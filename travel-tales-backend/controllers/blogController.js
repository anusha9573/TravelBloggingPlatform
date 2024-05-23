const Blog = require('../models/Blog');

// @desc    Get all blog posts
// @route   GET /api/posts
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username').populate('media'); // Populate media references
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new blog post
// @route   POST /api/posts
exports.createBlog = async (req, res) => {
  const { title, content, author, media } = req.body; // Include media in the request body
  try {
    const newBlog = new Blog({
      title,
      content,
      author,
      media // Include media references in the new blog post
    });

    await newBlog.save();
    res.json(newBlog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get details of a specific blog post
// @route   GET /api/posts/:id
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username')
      .populate('comments')
      .populate('media'); // Populate media references
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update details of a specific blog post
// @route   PUT /api/posts/:id
exports.updateBlog = async (req, res) => {
  const { title, content, media } = req.body; // Include media in the request body
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    blog.title = title;
    blog.content = content;
    blog.media = media; // Update media references

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a specific blog post
// @route   DELETE /api/posts/:id
// @desc    Delete a specific blog post
// @route   DELETE /api/posts/:id
exports.deleteBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Blog removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

