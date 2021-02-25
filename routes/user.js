var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { populate } = require('../models/journeymodel');
var journeyModel = require('../models/journeymodel')
var userModel = require('../models/sessionmodel')

router.get('/', async function(req, res, next) {
    
var myTickets = await userModel
.findOne({email : req.session.user.email})
.populate('journey')
.exec()


    res.render('users', {myTickets});
});


module.exports = router;