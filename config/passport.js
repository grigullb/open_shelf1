"use strict";
const LocalStrategy= require('passport-local').Strategy;
const bcrypt  = require('bcrypt-nodejs');
let User = require('../models/user');

module.exports = function(passport) {
  // passport session setup
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      //TODO: verify findById is a valid query (source is Mongo, Bookshelf equivalent?)
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  // name the strategy for futureproofing other authentication methods 
  passport.use('local-signup', new LocalStrategy({
      // default local strategy uses username and password, override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows passing back the entire request to the callback
  }, 
  function(req, email, password, done) {  //is this from the form data?
      // asynchronous
      // User.where wont fire unless data is sent back
      process.nextTick(function() {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.where({ 'email':  email }).fetch().then( function(user) {
          // check to see if theres already a user with that email
          if (user) {
              return done(null, false); 
              // return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
              // if there is no user with that email, create user
              User.forge({
                //refers to the name attr on form inputs
                firstname: req.body.firstname,     
                lastname: req.body.lastname, 
                email: email, 
                password: generateHash(password),
              })
              .save()
              .then(function(newUser){
                console.log(newUser);
                return done(null, newUser);
              })
              .catch(function (err){
                console.log(err);
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
              return done(null, false);
              // return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
          }// all is well, return successful user
          return done(null, user);
      });

  }));
}