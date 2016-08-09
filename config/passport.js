const LocalStrategy= require('passport-local').Strategy;
let User = require('../models/user');

module.exports = function(passport) {
  // passport session setup
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  // name the strategy for futureproofing other authentication methods 
  passport.use('local-signup', new LocalStrategy({
      // default local strategy uses username and password, override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows passing back the entire request to the callback
  },
  function(req, email, password, done) {
      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.where({ 'email' :  email }, function(err, user) {
          // if there are any errors, return the error
          if (err)
              return done(err);

          // check to see if theres already a user with that email
          if (user) {
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {

              // if there is no user with that email
              // create the user
              var newUser            = new User();

              // set the user's local credentials
              newUser.email    = email;
              newUser.password = newUser.generateHash(password);

              // save the user
              newUser.save(function(err) {
                  if (err)
                      throw err;
                  return done(null, newUser);
              });
          }
      });    
      });
  }));

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) { // callback with email and password from our form
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.where({ 'email':  email }).fetch().then( function(user) {
          console.log(user);
          if (!user || !user.validPassword(password)) {
              console.log("not valid pw");
              return done(null, false);
              // return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
          }// all is well, return successful user
          return done(null, user);
      });

  }));
};