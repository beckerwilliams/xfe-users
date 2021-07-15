#!/usr/bin/env node
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
    [aragorn:~/development/fs-artifact-scanner] ron% /usr/bin/time csh -c "src/test_ScanFs.js ~/ -type f | wc -l"
    680574
    4.68 real         4.75 user         5.24 sys

    We See the increase in processing time on the last because Filtering has Been Added


    Testing for Exclusions
    [aragorn:~/development/fs-artifact-scanner/src] ron% ./test_ScanFs.js ../.. | grep -E '(\.)*deps$|\.DS_Store$|(\.)*git$|(\.)*gitignore$|\.target$|(\.)*Trash$|(\.)*idea$|(\.)*npm$|node$|node_modules$|npm$System$|(\.)*tmp$work$|working$|\.pyenv.d$'

    [aragorn:~/development/fs-artifact-scanner/src] ron% find ../.. | grep -E '(\.)*deps$|\.DS_Store$|(\.)*git$|(\.)*gitignore$|\.target$|(\.)*Trash$|(\.)*idea$|(\.)*npm$|node$|node_modules$|npm$System$|(\.)*tmp$work$|working$|\.pyenv.d$'|wcl
    1410

    [aragorn:~/development/fs-artifact-scanner/src] ron% ./test_ScanFs.js ../.. | grep -E '(\.)*deps$|\.DS_Store$|(\.)*git$|(\.)*gitignore$|\.target$|(\.)*Trash$|(\.)*idea$|(\.)*npm$|node$|node_modules$|npm$System$|(\.)*tmp$work$|working$|\.pyenv.d$'|wcl
    <NUTHIN>

 */
//
// const fs = require('fs');
// const path = require('path');
// const escape_rgx_str = require('escape-string-regexp');
// const conf = require("../conf/conf").Test_ScanFs;
//
// // Test_ScanFs Object
// const Test_ScanFs = {name: "Test_ScanFs"};
//
// Test_ScanFs.err_msg = (msg) => {
//     return msg || conf.cli_messages.error;
// };
// Test_ScanFs.scan = (dir, lopts) => {
//
//     fs.readdir(dir, lopts || conf.default_options, (err, files) => {
//
//         if (!err) { // We're good to evaluate
//             files.forEach(dir_entry => {
//                 let full_path = path.join(dir, dir_entry.name);
//                 // if (true) {
//                 if (escape_rgx_str(dir_entry.name).search(conf.filters.default_path_exclusions) < 0) {
//                     // We're here because the file found is NOT in the exclusion list
//                     if (dir_entry.isFile()) {
//                         console.log(full_path);
//                     } else if (dir_entry.isDirectory()) {
//                         // Traverse to next Directory
//                         Test_ScanFs.scan(full_path);
//                     }
//                     // The Balance of File Types are NOT of Interest
//                     // else if (dir_entry.isSocket()) {
//                     //     console.log(`s:    ${full_path}`);
//                     // } else if (dir_entry.isBlockDevice()) {
//                     //     console.log(`b:${full_path}`);
//                     // } else if (dir_entry.isCharacterDevice()) {
//                     //     console.log(`c:${full_path}`);
//                     // } else if (dir_entry.isSymbolicLink()) {
//                     //     console.log(`l:${full_path}`);
//                     // } else if (dir_entry.isFIFO()) {
//                     //     console.log(`p:${full_path}`);
//                     // }
//                     // else {
//                     //     console.info(`unk: ${full_path}`);
//                     // }
//                 }
//             });
//         } else if (err.code === 'ENOENT') {
//             console.error(`Empty: ${fs.realpathSync(dir)}`);
//         } else if (err.code === 'EPERM') {
//             console.error(`No Permissions on Directory: ${fs.realpathSync(dir)}`);
//         } else if (err.code === 'EACCES') {
//             console.error(`Permission Denied: ${fs.realpathSync(dir)}`);
//         } else if (err.code === 'EBADF') {
//             console.error(`File Descriptor: ${fs.realpathSync(dir)}`);
//         } else if (err.code === 'ENOTDIR') {
//             console.error(`Not a directory" ${fs.realpathSync(dir)}`);
//         } else throw err;
//     });
// }
// module.exports = Test_ScanFs;
const fs = require('fs');
const Test_ScanFs = require('./ScanFs');
// MAIN
if (process.argv.length <= 2) {
    console.log(Test_ScanFs.err_msg());
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
        fs.realpathSync(dir)
    } catch (err) {
        if (err) {
            if (err.code === "ENOENT") {
                console.log(Test_ScanFs.err_msg())
                console.error(`\tInvalid Scan Path, no such directory: ${dir}`);
            } else console.error(`\tInvalid Scan Path, error: ${err}`)
            return -1;
        }
    }
Test_ScanFs.scan(dir);
// Test_ScanFs.scan(fs.realpathSync(dir));

