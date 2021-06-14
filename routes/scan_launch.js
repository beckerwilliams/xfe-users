// prototype scan launcher
//
/* Assumes has all attributes to run 'A Scan' -
   Knows how to start it, stop it. To pause it is a stretch goal
  ~rbw
 */
//
const relUrl = "/";
const NOT_IMPLEMENTED = 'NOT IMPLEMENTED'

const router = require('express').Router();

function sendNotImplemented(req, res, next) {
    console.log(req.method + " " + req.baseUrl + req.url + " " + NOT_IMPLEMENTED);
    // res.send('GET /scans NOT IMPLEMENTED')
    res.send(req.method + " "+ req.baseUrl + req.url + " " + NOT_IMPLEMENTED);
}


router.all(relUrl, function(req, res, next) {
    // res.send(req.method + " /scans NOT IMPLEMENTED");
    sendNotImplemented(req, res, next);
});

module.exports = router;