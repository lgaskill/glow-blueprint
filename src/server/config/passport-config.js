const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const UserModel = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, done) => {
      // Match on the username OR email
      UserModel.findOne({ $or: [{ username }, { email: username }] })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { "username or password": "is invalid" }
            });
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);
