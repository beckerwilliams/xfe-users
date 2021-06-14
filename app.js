// fs-artifact-scanner
// author ron williams, cto, isg global
// 2021.06.13
// Have an Authenticated (Basic Authentication), CORS Controlled Web Server
//
let conf = require('./conf/fs-artifiact-scanner.json');
console.log("Conf: " + conf);

const createError = require('http-errors');
const express = require('express');

const basicAuth = require('express-basic-auth');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const scansRouter = require('./routes/scans');


// Primary Application Server
const app = express();

// Cross Site Origination Configuration
const cors = require('cors');
app.use(cors(conf.cors_options));

// Authentication Configurationm
const ba_users = require('./auth/ba_users')  // This Loads the BA Dictionary for Direct Authentication
app.use(basicAuth(ba_users()));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Logging and Data Handling
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Supported Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/scans', scansRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
