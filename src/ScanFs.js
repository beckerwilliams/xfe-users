// ScanFs.js
//
// author: ron williams
// email: ron.williams@infosecglobal.com
// date: 2021.07.01
/*
   ToDo
    Enable ScanFs.js from Express App

   ToDo
    Replace 'console.error' with 'Throw Exception' on Error (Starts on line 72)

   ToDo
    Provide callback to process files as needed

 */
/*
    Post Commit Test 2021.07.01

  With ScanFs Straight File Search - NO FILTERS
    $ time csh -c \
        "./test_ScanFs.js /Users/ron/development -type f | wc -l"; \
        time csh -c "find /Users/ron/development -type f | wc -l"

    ScanFs.js
    221337
        1.14 real         1.16 user         1.63 sys

    /usr/bin/find
    221337
        2.31 real         0.17 user         2.14 sys

  With FILTERED ScanFS Search
    $ time csh -c \
        "./test_ScanFs.js /Users/ron/development -type f | wc -l" ; \
        time csh -c "find /Users/ron/development -type f | wc -l"

    ScanFs.js
    120929
        0.94 real         0.95 user         0.86 sys
    /usr/bin/find
    221337
        2.30 real         0.17 user         2.14 sys

 */
const fs = require('fs');
const path = require('path');
const escape_rgx_str = require('escape-string-regexp');

const conf = require("../conf/fs-artifact-scanner.json").ScanFs;

// ScanFs Object
const ScanFs = {name: "ScanFs"};

ScanFs.err_msg = (msg) => {
    return msg || conf.cli_messages.error;
};
ScanFs.scan = (dir, opts) => {
    // ScanFs opts defaults to
    //
    //  "default_options": {
    //      "withFileTypes": "true"
    //  }

    fs.readdir(dir, opts || conf.default_options, (err, files) => {

        if (!err) { // We're good to evaluate
            files.forEach(dir_entry => {
                let full_path = path.join(dir, dir_entry.name);
                if (escape_rgx_str(dir_entry.name).search(conf.filters.default_path_exclusions) < 0) {
                    // We're here because the file found is NOT in the exclusion list
                    if (dir_entry.isFile()) {
                        console.log(full_path);
                    } else if (dir_entry.isDirectory()) {
                        // Traverse to next Directory
                        ScanFs.scan(full_path);
                    }
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
