// fs-artifact-scanner Administrative Interface, admin/app.js
// author ron williams, cto, isg global
// 2021.06.13
// Have an Authenticated (Basic Authentication), CORS Controlled Web Server
//
let conf = require(path.join(__dirname, '../conf/fs-artifiact-scanner.json');
console.log("Conf: " + conf);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
// Get Express Constructor
const express = require('express');
// Enable Basic Authorization (basic-auth)
const basicAuth = require('express-basic-auth');
// Admin App Server
const admin = express();

// Cross Site Origination Configuration
const cors = require('cors');
admin.use(cors(conf.cors_options));

// Authentication Configurationm
const ba_users = require('../auth/ba_users')  // This Loads the BA Dictionary for Direct Authentication
admin.use(basicAuth(ba_users()));

// view engine setup
admin.set('views', path.join(__dirname, 'views'));
admin.set('view engine', 'pug');

// Main Server / Logging and Data Handling
admin.use(logger('dev'));
admin.use(express.json());
admin.use(express.urlencoded({extended: false}));
admin.use(cookieParser());
admin.use(express.static(path.join(__dirname, 'public')));

// Main Application Supported Routes

// Router Configuration

admin.use('/', admin); // Root of the Admin Application

// Admin Relative Root
admin.use('/', function(req, res, next) {
    res.send(req.method + " " + req.baseUrl + req.url + ": NOT IMPLEMENTED");
});

// catch 404 and forward to error handler
admin.use(function (req, res, next) {
    next(createError(404));
});

// error handler
admin.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = admin;
