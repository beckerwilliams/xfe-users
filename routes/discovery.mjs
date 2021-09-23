'use strict'
// prototype scan launcher
//
/* Assumes has all attributes to run 'A Scan' -
   Knows how to start it, stop it. To pause it is a stretch goal
  ~rbw
 */
//
import express from 'express'
import { env } from 'process'
import Collector from '../src/Collector.mjs'

const router = express.Router()
const discovery = new Collector()

const fake_response = (req, res) => {
    res.set('X-FAKE-HEADERS', 'XXXXXblahblahblahXXXXX')
    res.set('content-type', 'application/json')
    res.set('accept', 'application/json')
    res.send({title: 'Artifact Discovery Scan Page'})
    if (req.query && req.query.length > 0) {
        let dd = []  // Append $HOME to directory entries
        req.query.dd.split(',').forEach((val)=> {
            dd.push(env['HOME']  + '/' + val)
        })
        console.debug(`discovery.collect_fs(${dd}) requested ...`)
        discovery.collect_fs(dd)
    }
}

router.all('/', (req, res) => {
    // Setup

    // ACTION = Execute Path, Ultimately
    /***
     * <root>/discovery
     * Parameters
     *  Target Directory list, "default", or FQDN for each directory, Comma Separarated
     *
     *  api: /discovery
     *  method: PUT
     *  parameters
     *      d_targets: <fq pathname>[,<fq pathname>[,...[<fq pathname]]]: String
     *      detection_suite: <id>[,<id>[,...[<id]]]: String
     *
     *  Response:
     *      Success: Scan Registered
     *      Failure: <error code, error message, traceback>
     *
     */
    fake_response(req, res)

})
export default router
