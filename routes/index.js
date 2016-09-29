'use strict'

var Auth = require('./auth');
// var passport = require('passport');
var cs = require('client-sessions');
var User = require('../models/user');

module.exports = function(app) {
    // SITE ROOT
    app.get('/', (req, res) => { // replace this route with a landing or home page, or break this out into another controller if needed!
        res.render('home');
    });
    app.get('/login', Auth.render); // route for the login page
    app.get('/logout', Auth.logout); // route for logging out

    app.post('/login', Auth.login); // form request emdpoint for loggin in
    app.post('/register', Auth.register); // form request endpoint for user registration

    // DAHSBOARD
    app.all('/profile*', Auth.session); // protect all dashboard routes from unauthorized users
    app.get('/profile', (req, res) => { // renders the dashboard, break this out into another controller if needed!
        User.findOne(
            {
                email: req.session.user.email // sent from the frontend in a POST request
            },
            (err, user) => {
                // If there was an error in mongo, send back a 500 response (general server error) to the Frontend
                if (err || !user) {
                    res.redirect('/');
                }
                else
                {
                    res.render('profile', req.session);    
                }
            }
        );
    });


    app.get('/company-list', (req, res) => { // replace this route with a landing or home page, or break this out into another controller if needed!
        res.render('company-list');
    });
    app.get('/company', (req, res) => { // replace this route with a landing or home page, or break this out into another controller if needed!
        res.render('company');
    });
    app.get('/garage', (req, res) => { // replace this route with a landing or home page, or break this out into another controller if needed!
        res.render('garage');
    });

    app.get('/userInfo', (req,res) => {
        console.log(req.session)
        //console.log(req.csession['username']);
         User.findOne(
            {
                email: req.session.user.email // sent from the frontend in a POST request
            },
            (err, user) => {
                // If there was an error in mongo, send back a 500 response (general server error) to the Frontend
                if (err) {
                    console.error('Failed to find user for information.');
                    res.status(500).send({status: 500, message: 'Backend error'});
                }
                if (!user) {
                    // If there was no user found for the given user name, send back a 403 response (forbidden)
                    res.status(403).send(errors.login);
                } else {
                    res.json(user);        
                }
            }
        );
    });

//     // Passport Routes
//     app.get('/login/facebook',
//     passport.authenticate('facebook'));

//   app.get('/login/facebook/return',
//     passport.authenticate('facebook', { failureRedirect: '/login' }),
//     function(req, res) {
//       res.redirect('/');
//     });


}
