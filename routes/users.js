var express = require('express');
var router = express.Router();

router.all('/', function(req, res, next) {
  res.send(req.method + " \/users NOT IMPLEMENTED");
});

module.exports = router;
