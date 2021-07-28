#!/usr/bin/env node
'use strict';

// <FILE>
// author: ron williams
// email: ron.williams@infosecglobal.com
// date:
// import { fs } from 'fs';
/*


    Command Line Test
    Each Run Delivers Precisely the SAME RESULTS for File Only Scanning

    FIND: Looking for FILES Only
    [aragorn:~/development/fs-artifact-scanner] ron% /usr/bin/time csh -c "find ~/ -type f | wc -l"
    789582
    23.72 real         0.68 user        10.49 sys

    ScanFS.js: All FILES Only
    [aragorn:~/development/fs-artifact-scanner] ron% /usr/bin/time csh -c "src/Test_ScanFs.js ~/ -type f | wc -l"
    789595
    3.93 real         4.00 user         6.27 sys

    Test_ScanFs.js: With Internal Default File Exclusion Filter
    [aragorn:~/development/fs-artifact-scanner] ron% /usr/bin/time csh -c "src/test_ScanFs.mjs ~/ -type f | wc -l"
    680574
    4.68 real         4.75 user         5.24 sys

    We See the increase in processing time on the last because Filtering has Been Added


    Testing for Exclusions
    [aragorn:~/development/fs-artifact-scanner/src] ron% ./test_ScanFs.mjs ../.. | grep -E '(\.)*deps$|\.DS_Store$|(\.)*git$|(\.)*gitignore$|\.target$|(\.)*Trash$|(\.)*idea$|(\.)*npm$|node$|node_modules$|npm$System$|(\.)*tmp$work$|working$|\.pyenv.d$'

    [aragorn:~/development/fs-artifact-scanner/src] ron% find ../.. | grep -E '(\.)*deps$|\.DS_Store$|(\.)*git$|(\.)*gitignore$|\.target$|(\.)*Trash$|(\.)*idea$|(\.)*npm$|node$|node_modules$|npm$System$|(\.)*tmp$work$|working$|\.pyenv.d$'|wcl
    1410

    [aragorn:~/development/fs-artifact-scanner/src] ron% ./test_ScanFs.mjs ../.. | grep -E '(\.)*deps$|\.DS_Store$|(\.)*git$|(\.)*gitignore$|\.target$|(\.)*Trash$|(\.)*idea$|(\.)*npm$|node$|node_modules$|npm$System$|(\.)*tmp$work$|working$|\.pyenv.d$'|wcl
    <NUTHIN>

 */
import fs from 'fs';
import Collector from  '../src/Collector.mjs';

// MAIN
if (process.argv.length <= 2) {
    console.log("Usage: ./test_ScanFs.mjs <Directory to Scan>");
    process.exit(-1);
}

let dir = process.argv[2];
if (process.argv[2])
// todo check that directory exists here!
// Validate Legal Path
    /*
        will use '.' and '..' and report relative to each if NOT realpathSync(dir)
        HOWEVER - We want the full path if developing a list for serial processing.
        We DO NOT if processing grafted into the search tree (not desirable)
     */
    try {
        fs.realpathSync(dir);
    } catch (err) {
        if (err) {
            if (err.code === "ENOENT") {
                console.log(`\tInvalid Scan Path, no such directory: ${dir}`);
                console.error(`\tInvalid Scan Path, no such directory: ${dir}`);
            } else console.error(`\tInvalid Scan Path, error: ${err}`);
        }
    }
Collector.fs_scan(dir);

