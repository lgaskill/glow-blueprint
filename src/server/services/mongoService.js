const MongoClient = require("mongodb").MongoClient;
const BlogPost = require("../models/blogPost.js");

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-1z9rk.mongodb.net/test?retryWrites=true`;

const DB_NAME = "gb";
const client = new MongoClient(url, { useNewUrlParser: true });

exports.initClient = async () => {
  return new Promise((resolve, reject) => {
    client.connect(function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

exports.validateApiKey = async apiKey => {
  const db = client.db(DB_NAME);

  const collection = db.collection("api_keys");
  const keyRec = await collection.findOne({ key: apiKey });
  return !!keyRec;
};

exports.getBlogPosts = async apiKey => {
  const db = client.db(DB_NAME);

  const collection = db.collection("blog_posts");
  const blogPosts = await collection.find({}).toArray();
  if (!blogPosts) {
    return [];
  }

  return blogPosts;
};

exports.insertBlogPost = async blogPost => {
  if (!BlogPost.schema.isValid(blogPost)) {
    return false;
  }

  const db = client.db(DB_NAME);
  const collection = db.collection("blog_posts");
  const res = await collection.insertOne(blogPost);
  console.log("bla");
  return !!res && res.insertedCount > 0;
};
