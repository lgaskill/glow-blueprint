const UserModel = require("../models/user");
const passport = require("passport");
const emailService = require("../services/emailService");

const BOSS_MAMA_EMAIL = process.env.BOSS_MAMA_EMAIL;

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

      res.status(401).send("Authorization Failed");
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

    if (created) {
      // Notify Boss Mama
      emailService.send({
        recipients: [BOSS_MAMA_EMAIL],
        subject: "New Account Created",
        message: `<p><b>${firstName} ${lastName}</b> has just created a new account!</p><p></p><p>Go Say Hi!</p>`
      });
      res.status(202).send();
    } else {
      res.status(500).send("Failed to create user");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create blog posts");
  }
};

/**
 * Get current user by valid auth token
 */
exports.getByToken = async (req, res) => {
  const { payload } = req;

  let user;
  try {
    user = await UserModel.findOne(
      { _id: payload.id },
      {
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        notes: true
      }
    );
  } catch (err) {
    return res.status(500).send("Failed to get user");
  }

  res.send(user);
};

/**
 * Update current user by valid auth token
 */
exports.updateByToken = async (req, res) => {
  const { payload, body } = req;
  if (!body) {
    return res.status(400).send();
  }

  let user;
  try {
    user = await UserModel.findOne({ _id: payload.id }, { _id: true });
  } catch (err) {
    return res.status(500).send("Failed to get user");
  }

  if (!user) {
    return res.status(404).send();
  }

  try {
    UserModel.updateOne({ _id: payload.id }, body, (err, data) => {
      if (err) {
        return res.status(500).send("Failed to update blog post");
      }
      res.status(204).send();
    });
  } catch (err) {
    res.status(500).send("Failed to update blog post");
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
