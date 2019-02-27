const jwt = require("express-jwt");

const UserModel = require("../models/user");

const getTokenFromHeaders = req => {
  const {
    headers: { authorization }
  } = req;

  if (authorization && authorization.split(" ")[0] === "Token") {
    return authorization.split(" ")[1];
  }
  return null;
};

const required = jwt({
  secret: "secret",
  userProperty: "payload",
  getToken: getTokenFromHeaders
});

const optional = jwt({
  secret: "secret",
  userProperty: "payload",
  getToken: getTokenFromHeaders,
  credentialsRequired: false
});

const admin = async (req, res, next) => {
  const { payload } = req;
  if (!payload || !payload.id) {
    res.status(403).send();
    return;
  }

  let user;
  try {
    user = await UserModel.findOne({ _id: payload.id });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }

  if (!user || !user.isAdmin) {
    res.status(403).send();
  }

  next();
};

module.exports = { required, optional, admin };
