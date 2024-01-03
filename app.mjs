// fs-artifact-scanner
// ./app.mjs
// author ron williams, General Partner, Becker Williams Trading General Partnership
// 2021.06.13
// Have an Authenticated (Basic Authentication), CORS Controlled Web Server
//
// noinspection JSCheckFunctionSignatures

/**
 * #FS Artifact Scanner
 * @module ./app
 * @see module:express, module:helmet, module:express-basic-auth, module:cors, module:cookie, module:express-session, module:session-file-store, module:morgan, module:http-errors
 */
import conf from './conf/conf.mjs'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import createError from 'http-errors'

// Get Express Constructor
import express from 'express'

// Enable Basic Authorization (basic-auth)
import basicAuth from 'express-basic-auth'

// Primary App Server
const app = express()

// Admin App Server - Mounted on /admin
import admin from './admin/admin.mjs'

// HTTP Protection - helmet
import helmet from 'helmet'
app.use(helmet())

// Cross Site Origination Configuration
import cors from 'cors'
app.use(cors(conf.discovery_api.cors_options))

// Authentication  (Local / In-app User DB)
import ba_users from './auth/ba_users.mjs'
app.use(basicAuth(ba_users()))

// // Cookie Session Handling
// import session from 'express-session'
// import preFileStore from 'session-file-store'
// let FileStore = preFileStore(session)
// let fileStoreOptions = {}
// app.use(session({
//     store: new FileStore(fileStoreOptions),
//     secret: 6452783015556633
// }))
// import cookie from 'cookie'


// Establish Local __dirname NOTE: Must be run IN FILE where dirname desired.
// Note: This technique DOES NOT WORK if imported from a directory DIFFERENT from this File.
import {dirname} from 'path'
import {fileURLToPath} from 'url'
const local_dirname = dirname(fileURLToPath(import.meta.url))

// view engine setup
app.set('views', path.join(local_dirname, 'views'))
app.set('view engine', 'pug')

// Main Server / Logging and Data Handling
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(local_dirname, 'public')))

/** Main Application Supported Routes */
// Mount Admin application on '/admin' path
app.use('/admin', admin) // Admin Application

// Application Resource API (index, users, discovery)
import indexRouter from './routes/index.mjs'
app.use('/', indexRouter)
import usersRouter from './routes/users.mjs'
app.use('/users', usersRouter)
import discoveryRouter from './routes/discovery.mjs'
app.use('/discovery', discoveryRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res) { // no 'next' parameter
    // This is a Terminal operation
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})
export default app

