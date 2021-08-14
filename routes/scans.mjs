//
import {posix as path, win32} from 'path';
import express from 'express';

const router = express.Router();


// Internal Imports


const NOT_IMPLEMENTED = "NOT IMPLEMENTED";

const sendNotImplemented = (req, res, next) => {
    console.log(req.method + " " + req.baseUrl + req.url + " " + NOT_IMPLEMENTED);
    res.send(req.method + " " + req.baseUrl + req.url + " " + NOT_IMPLEMENTED);
};

router.all("/", sendNotImplemented);

router.param('host', (req, res, next, host) => {
    req.discover = host;
});
router.all('/host', (req, res, next) => {

});
export default router;

