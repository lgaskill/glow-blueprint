const BlogPostModel = require("../models/blogPost");

/**
 * Gets all blog posts
 * @param category catagory to filter posts
 */
exports.getAll = async (req, res) => {
  const { category } = req.query;

  let blogPosts;
  try {
    blogPosts = await BlogPostModel.find(
      category ? { category } : {},
      {},
      { sort: { createdAt: -1 } }
    );
  } catch (err) {
    return res.status(500).send("Failed to get blog posts");
  }
  res.status(200).send(blogPosts);
};

/**
 * Gets all blog post categories
 */
exports.getCategories = async (req, res) => {
  let blogPosts;
  try {
    blogPosts = await BlogPostModel.find({}, ["category"]);
  } catch (err) {
    return res.status(500).send("Failed to get blog post categories");
  }

  // Generate a list on each unique category
  const categories = Array.from(new Set(blogPosts.map(bp => bp.category)));

  res.status(200).send(categories);
};

// GET blog post by id
exports.get = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send();
  }

  try {
    const blogPost = await BlogPostModel.findOne({ _id: req.params.id });
    res.status(200).send(blogPost);
  } catch (err) {
    res.status(500).send("Failed to get blog post " + id);
  }
};

// POST blog post
exports.create = async (req, res) => {
  const blogPost = req.body;
  if (!blogPost || !blogPost.title || !blogPost.body || !blogPost.category) {
    return res.status(400).send("Invalid request format");
  }

  let blogPostModel;
  try {
    blogPostModel = new BlogPostModel(blogPost);
    await blogPostModel.validate();
  } catch (err) {
    return res.status(400).send("Invalid blog post format");
  }

  try {
    const created = await blogPostModel.save();
    !!created
      ? res.status(202).send(created)
      : res.status(500).send("Failed to create blog post");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create blog posts");
  }
};

// PATCH blog post
exports.update = async (req, res) => {
  const blogPostId = req.params.id;
  const blogPostUpdate = req.body;
  if (!blogPostId || !blogPostUpdate) {
    return res.status(400).send("Invalid request format");
  }

  // First, make sure the thing exists
  try {
    const existingPost = await BlogPostModel.findOne(
      { _id: blogPostId },
      { _id: true }
    );
    if (!existingPost) {
      return res.status(404).send("Intended blog post not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Failed to validate blog post");
  }

  try {
    await BlogPostModel.updateOne({ _id: blogPostId }, blogPostUpdate);
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Failed to update blog post");
  }
};
