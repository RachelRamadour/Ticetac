var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const journeyModel = require('../models/journeymodel');


router.post('/', async function(req, res, next) {

    var journeyAgency = await journeyModel.find({ departure: req.body.departure, arrival: req.body.destination, date: new Date(req.body.departureDate) })

    var dateWished = req.body.departureDate;

    res.render('train', { journeyAgency, dateWished })
})


module.exports = router;