var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var userModel = require('../models/sessionmodel')

router.get('/', function(req, res, next) {
    var loginError = ''
    var signupError = ''
    res.render('login', { signupError: signupError, loginError: loginError });
});

router.post('/signin', async function(req, res) {
    var loginError = ''
    var signupError = ''

    var authentUser = await userModel.find({
        email: req.body.email,
        password: req.body.password
    })
    console.log(authentUser)


    if (authentUser.length > 0) {
        req.session.user = { name: req.body.lastname, email: req.body.email }
    } else {
        loginError = 'Login Error'
        res.render('login', { signupError: signupError, loginError: loginError });
    }

    res.redirect('/');
});

router.post('/signup', async function(req, res) {
    var loginError = ''
    var signupError = ''
    try {
        var newUser = new userModel({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            password: req.body.password,
        });

        await newUser.save()

        req.session.user = { name: req.body.lastname, email: req.body.email }
        res.redirect('/');

    } catch (error) {
        console.error(error)
        var signupError = 'Sign-up Error'
        res.render('login', { signupError: signupError, loginError: loginError });
    }
});

module.exports = router;