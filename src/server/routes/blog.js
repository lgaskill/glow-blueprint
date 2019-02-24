const BlogPostModel = require("../models/blogPost");

exports.getAll = async (req, res) => {
  let blogPosts;
  try {
    blogPosts = await BlogPostModel.find({});
  } catch (err) {
    res.status(500).send("Failed to get blog posts");
  }
  res.status(200).send(blogPosts);
};

// GET blog post by id
exports.get = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send();
    return;
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
    res.status(400).send("Invalid request format");
    return;
  }

  let blogPostModel;
  try {
    blogPostModel = new BlogPostModel(blogPost);
  } catch (err) {
    res.status(400).send("Invalid blog post format");
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
    res.status(400).send("Invalid request format");
    return;
  }

  try {
    // First, make sure the thing exists
    const existingPost = await BlogPostModel.findOne({ _id: blogPostId });
    if (!existingPost) {
      res.status(400).send("Intended blog post not found");
      return;
    }

    try {
      const result = await BlogPostModel.update(
        { _id: blogPostId },
        blogPostUpdate
      );
      res.status(204).send();
    } catch (err) {
      res.status(500).send("Failed to update blog post");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to create blog posts");
  }
};
