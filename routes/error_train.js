
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res, next) {
    res.render('error_train', {} );
  });

  module.exports = router;
