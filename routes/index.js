var express = require('express');
var router = express.Router();

router.all('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Filesystem Artifact Scanner Home Page!' });
});

module.exports = router;
