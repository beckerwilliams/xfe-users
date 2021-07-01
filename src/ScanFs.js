// <FILE>
// author: ron williams
// email: ron.williams@infosecglobal.com
// date: 
// #!/usr/bin/env node
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
    [aragorn:~/development/fs-artifact-scanner] ron% /usr/bin/time csh -c "src/test_ScanFs.js ~/ -type f | wc -l"
    789595
    3.93 real         4.00 user         6.27 sys

    test_ScanFs.js: With Internal Default File Exclusion Filter
    [aragorn:~/development/fs-artifact-scanner] ron% /usr/bin/time csh -c "src/test_ScanFs.js ~/ -type f | wc -l"
    680574
    4.68 real         4.75 user         5.24 sys

    We See the increase in processing time on the last because Filtering has Been Added



 */
// import { fs } from 'fs';
const fs = require('fs');
// import { path } from 'path';
const path = require('path');
// import { escape_rgx_str } from 'escape-string-regexp';
const escape_rgx_str = require('escape-string-regexp');
const conf = require("../conf/fs-artifact-scanner.json").ScanFs;

// ScanFs Object
const ScanFs = {name: "ScanFs"};

ScanFs.err_msg = (msg) => {
    return msg || conf.cli_messages.error;
};
ScanFs.scan = (dir, lopts) => {

    fs.readdir(dir, lopts || conf.default_options, (err, files) => {

        if (!err) { // We're good to evaluate
            files.forEach(dir_entry => {
                let full_path = path.join(dir, dir_entry.name);
                // if (true) {
                if (escape_rgx_str(dir_entry.name).search(conf.filters.default_path_exclusions) < 0) {
                    // We're here because the file found is NOT in the exclusion list
                    if (dir_entry.isFile()) {
                        console.log(full_path);
                    } else if (dir_entry.isDirectory()) {
                        // Traverse to next Directory
                        ScanFs.scan(full_path);
                    }
                    // The Balance of File Types are NOT of Interest
                    // else if (dir_entry.isSocket()) {
                    //     console.log(`s:    ${full_path}`);
                    // } else if (dir_entry.isBlockDevice()) {
                    //     console.log(`b:${full_path}`);
                    // } else if (dir_entry.isCharacterDevice()) {
                    //     console.log(`c:${full_path}`);
                    // } else if (dir_entry.isSymbolicLink()) {
                    //     console.log(`l:${full_path}`);
                    // } else if (dir_entry.isFIFO()) {
                    //     console.log(`p:${full_path}`);
                    // }
                    // else {
                    //     console.info(`unk: ${full_path}`);
                    // }
                }
            });
        } else if (err.code === 'ENOENT') {
            console.error(`Empty: ${fs.realpathSync(dir)}`);
        } else if (err.code === 'EPERM') {
            console.error(`No Permissions on Directory: ${fs.realpathSync(dir)}`);
        } else if (err.code === 'EACCES') {
            console.error(`Permission Denied: ${fs.realpathSync(dir)}`);
        } else if (err.code === 'EBADF') {
            console.error(`File Descriptor: ${fs.realpathSync(dir)}`);
        } else if (err.code === 'ENOTDIR') {
            console.error(`Not a directory" ${fs.realpathSync(dir)}`);
        } else throw err;
    });
}
module.exports = ScanFs;
