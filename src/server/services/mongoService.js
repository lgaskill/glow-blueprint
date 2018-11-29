const ApiKeyModel = require("../models/apiKey");
const BlogPostModel = require("../models/blogPost.js");

exports.validateApiKey = async apiKey => {
  const keyRec = await ApiKeyModel.findOne({ key: apiKey });
  return !!keyRec;
};

exports.getBlogPosts = async () => {
  const blogPosts = await BlogPostModel.find({});
  if (!blogPosts) {
    return [];
  }

  return blogPosts;
};

exports.getBlogPostById = blogPostId => {
  return BlogPostModel.findOne({ _id: blogPostId });
};

exports.insertBlogPost = async blogPost => {
  let blogPostModel;
  try {
    blogPostModel = new BlogPostModel(blogPost);
  } catch (err) {
    return false;
  }

  const res = await blogPostModel.save();
  return !!res;
};

// exports.uploadImage = async;
