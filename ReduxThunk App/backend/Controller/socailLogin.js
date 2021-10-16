var passport = require('passport');
const Users = require('../model/Users');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config(); 
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log(user);
  done(null, user);
  // Users.findById(id)
  //   .then(user => {
  //     done(null, user);
  //   })
});
exports.LoginGG = async (req, res, next) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      cb(null, profile)
  }
));
res.render('index')
};

exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/")
}
