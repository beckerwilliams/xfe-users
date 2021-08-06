import express from 'express';

const router = express.Router();

router.all('/', function(req, res, next) {
  res.send(req.method + " \/users NOT IMPLEMENTED");
});
export default router;

