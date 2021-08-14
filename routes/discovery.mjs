// prototype scan launcher
//
/* Assumes has all attributes to run 'A Scan' -
   Knows how to start it, stop it. To pause it is a stretch goal
  ~rbw
 */
//
const NOT_IMPLEMENTED = 'NOT IMPLEMENTED';

let relUrl = "/";
import express from 'express';
let router = express.Router();

const sendNotImplemented = (req, res) => {
    res.send(req.method + " " + req.baseUrl + req.url + " " + NOT_IMPLEMENTED);
};

router.all(relUrl, function (req, res, next) {
    sendNotImplemented(req, res, next);
});

router.param('host', (req, res, next, host) => {
    req.addon = host;
});

// router.all(path(relUrl, discovery))
export default router;
