const MongoClient = require("mongodb").MongoClient;

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-1z9rk.mongodb.net/test?retryWrites=true`;

const dbName = "gb";
const client = new MongoClient(url, { useNewUrlParser: true });

// TODO: Manage Session

exports.test = () => {
  client.connect(function(err) {
    const db = client.db(dbName);

    const collection = db.collection("api_keys");

    collection
      .find({})
      .toArray()
      .then(values => {
        console.log(values);
      });

    client.close();
  });
};

exports.validateApiKey = apiKey => {
  return new Promise((resolve, reject) => {
    client.connect(function(err) {
      const db = client.db(dbName);

      const collection = db.collection("api_keys");

      console.log("KEY:", apiKey);

      collection.findOne({ key: apiKey }).then(
        function success(value) {
          console.log(value);
          if (value) {
            resolve();
            client.close();
          } else {
            reject();
            client.close();
          }
        },
        function error() {
          reject();
          client.close();
        }
      );
    });
  });
};
