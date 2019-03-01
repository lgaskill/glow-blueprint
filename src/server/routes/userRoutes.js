const UserModel = require("../models/user");
const passport = require("passport");

require("../config/passport-config");

// Authentication
exports.authenticate = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("No username/password provided");
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user: user.toAuthJSON() });
      }

      return status(400).info;
    }
  )(req, res, next);
};

// POST user
exports.create = async (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).send("Invalid request format");
  }

  // Ensure this isn't a duplicate
  try {
    const duplicate = await UserModel.findOne({
      $or: [{ username }, { email }]
    });
    if (!!duplicate) {
      return res.status(303).send("Account already exists");
    }
  } catch (err) {
    return res.status(500).send("Failed to validate user ");
  }

  let user;
  try {
    user = new UserModel({ firstName, lastName, username, email });
  } catch (err) {
    res.status(400).send("Invalid user format");
  }

  user.setPassword(password);

  try {
    const created = await user.save();
    !!created
      ? res.status(202).send()
      : res.status(500).send("Failed to create user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create blog posts");
  }
};

exports.getAll = async (req, res) => {
  // Get all users
  let users;
  try {
    users = await UserModel.find({});
  } catch (err) {
    return res.status(500).send("Failed to get user records");
  }

  res.send(users);
};
