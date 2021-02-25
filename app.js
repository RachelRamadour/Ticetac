var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var trainRouter = require('./routes/train')
var basketRouter = require('./routes/basket')
var loginRouter = require('./routes/login')
var errorTrainRouter = require('./routes/error_train')

var models = require('./routes/index')

var app = express();
require('./models/journey')


//Session
app.use(
    session({
        secret: 'a4f8071f-c873-4447-8ee2',
        resave: false,
        saveUninitialized: false,
    })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/train', trainRouter);
app.use('/basket', basketRouter);
app.use('/login', loginRouter)
app.use('/error_train', errorTrainRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;