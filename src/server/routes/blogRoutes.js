const BlogPostModel = require("../models/blogPost");
const eventService = require("../services/eventService");

/**
 * Gets all blog posts
 * @param category catagory to filter posts
 */
exports.getAll = async (req, res) => {
  const { category } = req.query;
  const isAdmin = !!req.payload && req.payload.isAdmin;

  const filter = category ? { category } : {};
  if (!isAdmin) {
    filter.isDraft = { $ne: true };
  }

  let blogPosts;
  try {
    blogPosts = await BlogPostModel.find(
      filter,
      {},
      { sort: { isDraft: -1, createdAt: -1 } }
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
  const isAdmin = !!req.payload && req.payload.isAdmin;

  const filter = !isAdmin ? { isDraft: { $ne: true } } : {};

  let blogPosts;
  try {
    blogPosts = await BlogPostModel.find(filter, ["category"]);
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

  let blogPost;
  try {
    blogPost = await BlogPostModel.findOne({ _id: req.params.id });
  } catch (err) {
    return res.status(500).send("Failed to get blog post " + id);
  }

  res.status(200).send(blogPost);

  // Register this miraculous event
  eventService.registerPageView({
    pageId: blogPost._id,
    pageName: blogPost.title,
    ipAddress: req.ip
  });
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
  let existingPost;
  try {
    existingPost = await BlogPostModel.findOne(
      { _id: blogPostId },
      { _id: true, isDraft: true }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("Failed to validate blog post");
  }

  if (!existingPost) {
    return res.status(404).send("Intended blog post not found");
  }

  const now = Date.now();
  blogPostUpdate.lastUpdatedAt = now;

  // Are we publishing a draft?
  if (existingPost.isDraft && blogPostUpdate.isDraft === false) {
    blogPostUpdate.createdAt = now;
  }

  try {
    await BlogPostModel.updateOne({ _id: blogPostId }, blogPostUpdate);
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Failed to update blog post");
  }
};
