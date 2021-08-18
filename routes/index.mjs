import express from 'express'

const router = express.Router()

router.all('/', function (req, res, next) {
    res.render('index', {title: 'Welcome to Filesystem Artifact Scanner Home Page!'})
})
export default router
