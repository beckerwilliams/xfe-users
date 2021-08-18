#!/usr/bin/env node
'use strict'

// External Imports
import {realpathSync} from 'fs'

// Internal Imports
import Collector from '../src/Collector.mjs'
import conf from '../conf/conf.mjs'
const cli_err_msg = conf.collector.fs.cli_error_msg

// MAIN
if (process.argv.length <= 2) {
    console.log(cli_err_msg)
    process.exit(-1)
}
// Process Command Line Args
let dirs = Array()
process.argv.forEach((f_path, idx) => {
    /**
     * Capture Directory Paths from Argument String (process.argv[2 to (dirs.length - 1)]
     */
    if (idx > 1) {
        console.log(`arg[${idx}]: ${f_path}`)
        try {
            realpathSync(f_path)
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.error(`Empty: ${f_path}, err: ${err}`)
            } else if (err.code === 'EPERM') {
                console.error(`No Permissions on Directory: ${f_path}, err: ${err}`)
            } else if (err.code === 'EACCES') {
                console.error(`Permission Denied: ${f_path}, err: ${err}`)
            } else if (err.code === 'EBADF') {
                console.error(`File Descriptor: ${f_path}, err: ${err}`)
            } else if (err.code === 'ENOTDIR') {
                console.error(`Not a directory: ${f_path}, err: ${err}`)
            } else
                console.error(`Invalid Scan Path, err: ${err}`)
        }
        dirs.push(f_path)
    }
})
// console.log(`dirs: ${dirs} is ${Array.isArray(dirs) ? 'an Array': 'NOT an Array'}`)
// process.exit(0)
const test_collector = new Collector()
test_collector.collect_fs(dirs)