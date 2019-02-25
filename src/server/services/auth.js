const jwt = require("express-jwt");

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

const admin = (req, res, next) => {
  const { payload } = req;
  if (!payload || !payload.isAdmin) {
    res.status(403).send();
    return;
  }

  next();
};

module.exports = { required, optional, admin };
