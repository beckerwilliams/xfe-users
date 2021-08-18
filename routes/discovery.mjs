// prototype scan launcher
//
/* Assumes has all attributes to run 'A Scan' -
   Knows how to start it, stop it. To pause it is a stretch goal
  ~rbw
 */
//
import express from 'express'
let router = express.Router()

router.all('/', function (req, res, next) {
    res.set('content-type', 'application/json')
    res.set('X-FAKE-HEADERS', 'XXXXXblahblahblahXXXXX')
    res.send({title: 'Artifact Discovery Scan Page'})
})
export default router
