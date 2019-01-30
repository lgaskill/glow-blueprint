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
      UserModel.findOne({ username })
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
