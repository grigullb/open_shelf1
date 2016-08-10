"use strict";
const LocalStrategy= require('passport-local').Strategy;
const bcrypt  = require('bcrypt-nodejs');
let User = require('../models/user');

module.exports = function(passport) {
  //bcrypt function to generate salted password
  function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  // passport session setup
  passport.serializeUser(function(user, done) {
      console.log(user);
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      //TODO: verify findById is a valid query (source is Mongo, Bookshelf equivalent?)
      // User.findById(id, function(err, user) {
      //     done(err, user);
      // });
      User.where({ 'id':  id }).fetch().then( function(err, user) {
          done(err, user);
      });
  });

  // SIGNUP LOGIC########################
  passport.use('local-signup', new LocalStrategy({
      // default local strategy uses username and password - override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows passing the HTTP request into the callback 
  }, 
  // fields passed from the form input tag with a corresponding name
  function(req, email, password, done) { 
      // asynchronous
      // User.where wont fire unless data is sent back
      process.nextTick(function() {
      // checks whether the user email already exists
      User.where({ 'email':  email }).fetch().then( function(user) {
          // check to see if theres already a user with that email
          if (user) {
              return done(null, false); 
              // TODO: flash messages. return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
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
              //return the newUser object
              .then(function(newUser){
                console.log(newUser);
                return done(null, newUser);
              })
              .catch(function (err){
                console.log(err);     ////debugging
              });
          }
        });    
     });
  }));

  // LOGIN LOGIC########################
  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) { 
      // find a user whose email is the same as the forms email
      User.where({ 'email':  email }).fetch().then( function(user) {
          if (!user || !user.validPassword(password)) {
              return done(null, false);
              // TODO: flash message .return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
          }
          return done(null, user); // all is well, return successful user
      });
  }));
}