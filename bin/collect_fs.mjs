#!/usr/bin/env node
'use strict'

// External Imports
import {realpathSync} from 'fs'

// Internal Imports
import Collector from '../src/Collector.mjs'
import conf from '../conf/conf.mjs'
const cli_err_msg = conf.collector.fs.cli_messages.error



// MAIN
if (process.argv.length <= 2) {
    console.log(cli_err_msg)
    process.exit(-1)
}
// Process Command Line Args
let scan_dirs = Array()
let error_dirs = Array()
process.argv.forEach((f_path, idx) => {
    /**
     * Capture Directory Paths from Argument String (process.argv[2 to (dirs.length - 1)]
     */
    if (idx > 1) {
        console.log(`arg[${idx}]: ${f_path}`)
        try {
            realpathSync(f_path)
            scan_dirs.push(f_path)
        } catch (err) {
            console.error(err)
            error_dirs.push(f_path)
        }
        //     if (err.code === 'ENOENT') {
        //         console.error(err)
        //         // console.error(`Empty: ${f_path}, err: ${err}`)
        //     } else if (err.code === 'EPERM') {
        //         console.error(err)
        //         // console.error(`No Permissions on Directory: ${f_path}, err: ${err}`)
        //     } else if (err.code === 'EACCES') {
        //         console.error(err)
        //         // console.error(`Permission Denied: ${f_path}, err: ${err}`)
        //     } else if (err.code === 'EBADF') {
        //         console.error(err)
        //         // console.error(`File Descriptor: ${f_path}, err: ${err}`)
        //     } else if (err.code === 'ENOTDIR') {
        //         console.error(err)
        //         // console.error(`Not a directory: ${f_path}, err: ${err}`)
        //     } else
        //         console.error(err)
        //         // console.error(`Invalid Scan Path, err: ${err}`)
        // }
    }
})
console.log(error_dirs)
const test_collector = new Collector()
test_collector.collect_fs(scan_dirs)
