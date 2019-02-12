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
