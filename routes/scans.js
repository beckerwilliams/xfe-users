var express = require('express');
var router = express.Router();

function NotImplemented(msg) {
  res.send(msg);
}

router.all('/', function(req, res, next) {
  res.send(req.method + " /scans NOT IMPLEMENTED");
});

module.exports = router;
