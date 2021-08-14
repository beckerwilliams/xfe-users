// fs-artifact-scanner Administrative Interface, admin/admin.mjs
// author ron williams, cto, isg global
// 2021.06.13
// Have an Authenticated (Basic Authentication), CORS Controlled Web Server
//
// noinspection DuplicatedCode

import path from 'path';

//// Node & Node Module Imports
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';
import basicAuth from 'express-basic-auth';

// Local Imports
import conf from '../conf/conf.mjs';

// Get Express Constructor
import express from 'express';
// Admin App Server
const admin = express();

// Cross Site Origination Configuration
import cors from 'cors';

admin.use(cors(conf.cors_options));

// Authentication Configurationm
import ba_users from '../auth/ba_users.mjs';
// const ba_users = require('../auth/ba_users')  // This Loads the BA Dictionary for Direct Authentication
admin.use(basicAuth(ba_users()));

// This Code replaces non-ES Module __dirname
// - Note: It must be loaded and run from the module in which directory id desired
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

// Admin Relative Root
admin.use('/', function (req, res) {
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
export default admin;

