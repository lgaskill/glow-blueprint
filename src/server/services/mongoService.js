const MongoClient = require("mongodb").MongoClient;

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-1z9rk.mongodb.net/test?retryWrites=true`;

const DB_NAME = "gb";
const client = new MongoClient(url, { useNewUrlParser: true });

exports.initClient = async () => {
  return new Promise((resolve, reject) => {
    client.connect(function(err) {
      if (err) {
        reject();
        return;
      }
      resolve();
    });
  });
};

exports.test = () => {
  const db = client.db(DB_NAME);

  const collection = db.collection("api_keys");
  collection
    .find({})
    .toArray()
    .then(values => {
      console.log(values);
    });

  client.close();
};

exports.validateApiKey = async apiKey => {
  const db = client.db(DB_NAME);

  const collection = db.collection("api_keys");
  const keyRec = await collection.findOne({ key: apiKey });
  return !!keyRec;
};
