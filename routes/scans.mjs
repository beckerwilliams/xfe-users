'use strict'
import express from 'express'

const router = express.Router()
const NOT_IMPLEMENTED = "NOT IMPLEMENTED"

const sendNotImplemented = (req, res) => {
    res.send(req.method + " " + req.baseUrl + req.url + " " + NOT_IMPLEMENTED)
}

router.all("/", sendNotImplemented)

router.param('host', (req, res, next, host) => {
    req.discover = host;
})
router.all('/host', (req, res, next) => {

})
export default router

