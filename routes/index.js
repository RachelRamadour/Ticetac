var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var journeyModel = require('../models/journeymodel')
var userModel = require('../models/sessionmodel')



var city = ["Paris", "Marseille", "Nantes", "Lyon", "Rennes", "Melun", "Bordeaux", "Lille"]
var date = ["2018-11-20", "2018-11-21", "2018-11-22", "2018-11-23", "2018-11-24"]



router.get('/', function(req, res, next) {
    if (typeof req.session.user === 'undefined') {
        res.redirect('/login');
    } else {
        res.render('index', {});
    }

});

router.get('/logout', function(req, res, next) {
    req.session.destroy()
    res.redirect('/login');
});


router.get('/save', async function(req, res, next) {

    var count = 300

    for (var i = 0; i < count; i++) {

        departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
        arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

        if (departureCity != arrivalCity) {

            var newUser = new journeyModel({
                departure: departureCity,
                arrival: arrivalCity,
                date: date[Math.floor(Math.random() * Math.floor(date.length))],
                departureTime: Math.floor(Math.random() * Math.floor(23)) + ":00",
                price: Math.floor(Math.random() * Math.floor(125)) + 25,
            });

            await newUser.save();

        }

    }
    res.render('index', { title: 'Express' });
});


router.get('/result', function(req, res, next) {

    for (i = 0; i < city.length; i++) {

        journeyModel.find({ departure: city[i] }, 

            function(err, journey) {

                console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
            }
        )

    }


    res.render('index', { title: 'Express' });
});



module.exports = router;