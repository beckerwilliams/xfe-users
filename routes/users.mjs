import express from 'express'
const router = express.Router()
const NOT_IMPLEMENTED = "Not Implemented"

router.all('/', function (req, res, next) {
    let method = req.method
    res.header('content-type', 'application/json')
    res.send({method: NOT_IMPLEMENTED})
})
export default router

