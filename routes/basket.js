var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var journeyModel = require('../models/journeymodel')
var userModel = require('../models/sessionmodel')
const stripe = require('stripe')('sk_test:');

router.get('/', function(req, res, next) {

    if (!req.session.order) {
        req.session.order = []
    }

    if (!req.session.idList) {
        req.session.idList = []
    }

    if (req.query.id !== undefined) {
        req.session.order.push({
            departure: req.query.departure,
            arrival: req.query.arrival,
            date: req.query.date,
            departureTime: req.query.departureTime,
            price: req.query.price,
            id: req.query.id
        })
        req.session.idList.push(req.query.id)
    }

    res.render('basket', {
        order: req.session.order
    });
});

router.post('/confirm', async function(req, res) {
    console.log(req.session.user.email)
    var userJourneyId = await userModel.findOne({
            email: req.session.user.email
        })
  

    console.log(userJourneyId)
    for (i = 0; i < req.session.idList.length; i++) {
        userJourneyId.journey.push(mongoose.Types.ObjectId(req.session.idList[i]))
    }

    var user = await userJourneyId.save()

    var checkId = await userModel.find({
        email: req.session.email
    })

    // Test Stripe
    var order = req.session.order;
    var stripeCard = [];

    var checkId = await userModel.find({ email: req.session.email })

    for (var i = 0; i < order.length; i++) {
        stripeCard.push({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: order[i].departure + '/' + order[i].arrival
                },
                unit_amount: parseInt(order[i].price) * 100,
            },
            quantity: 1,
        })
    }

    var session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: stripeCard,
        mode: 'payment',
        success_url: "lien",
        cancel_url: "lien/basket/",


    });

    res.json({ id: session.id })
});


router.get('/delete', function(req, res, next) {
    console.log(req.query.id)

    for (i = 0; i < req.session.order.length; i++) {
        if (req.session.order[i].id === req.query.id) {
            req.session.order.splice(i, 1)
        }
    }

    for (i = 0; i < req.session.idList.length; i++) {
        if (req.session.idList[i] === req.query.id) {
            req.session.idList.splice(i, 1)
        }
    }
    res.render('basket', { order: req.session.order });

})

module.exports = router;