const request = require("request");
const crypto = require("crypto");

const MC_API_KEY = process.env.MC_API_KEY;

exports.subscribe = async (list_id, email) => {
  return new Promise((resolve, reject) => {
    request.post(
      `https://us20.api.mailchimp.com/3.0/lists/${list_id}/members`,
      {
        json: { email_address: email, status: "subscribed" },
        auth: {
          user: "gb",
          pass: MC_API_KEY
        }
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(body);
        }
      }
    );
  });
};

exports.addTag = async (list_id, email, tag_name) => {
  await new Promise((resolve, reject) => {
    request.post(
      `https://us20.api.mailchimp.com/3.0/lists/${list_id}/members/${getEmailHash(
        email
      )}/tags`,
      {
        json: {
          tags: [{ name: tag_name, status: "active" }]
        },
        auth: {
          user: "gb",
          pass: MC_API_KEY
        }
      },
      function(error, response, body) {
        if (!error && response.statusCode == 204) {
          resolve(body);
        } else {
          reject(body);
        }
      }
    );
  });
};

exports.getMember = async (list_id, email) => {
  return new Promise((resolve, reject) => {
    request.get(
      `https://us20.api.mailchimp.com/3.0/lists/${list_id}/members/${getEmailHash(
        email
      )}`,
      {
        auth: {
          user: "gb",
          pass: MC_API_KEY
        }
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(body);
        }
      }
    );
  });
};

const getEmailHash = email => {
  return crypto
    .createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");
};
