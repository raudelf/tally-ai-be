const passport = require('passport');
const express = require('express');
const app = express();
require('./passport');

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/failed', (req, res) => res.send('Failed to log in'))

app.get('/google/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/google/yay')
})

app.get('/dashboard', (req, res) => res.send(`Welcome ${req.user.email}`))
app.get('/google/yay', (req, res) => res.send(`Successfully Logged out!`));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/google/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  }
  );

module.exports = app;