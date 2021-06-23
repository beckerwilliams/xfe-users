#!/usr/local/bin/node
// scan_fs.js
// Date Created: 2021.06.16T0124-0600
// author: Ron Williams
// email: ron.williams@infosecglobal.com
/*

    * exclusion_list: Array, List of path elements (any) to exclude.
    * default_options: Object, Contains REQUIRED '{withFileTypes: true}'
    * directories excluded
    Notes:
    time csh -c "./scan_fs.js /usr | wc -l"
        130738\\\
        0.663u 0.767s 0:00.66 215.1%	0+0k 0+0io 0pf+0w

    time csh -c "find /usr | wc -l"
        find: /usr/sbin/authserver: Permission denied
        120507
        0.074u 1.011s 0:01.07 100.9%	0+0k 0+0io 0pf+0w
 */
/*
    “The general pattern of a module is a function that defines private variables and functions;
    creates privileged functions which, through closure, will have access to the private variables and functions;
    and that returns the privileged functions or stores them in an accessible place.”

Excerpt From: Douglas Crockford. “JavaScript: The Good Parts.” Apple Books.
 */
const fs = require('fs');
const path = require("path");

const conf = require("../conf/fs-artifact-scanner.json").scan;

const default_exclusion_list = ['.keepme', '.pyenv.d', 'node_modules', 'Library', '.deps', '.git', 'node', '.gitignore', 'tmp', 'work', 'working'];
const default_select_ext = ['pem', 'der', 'cer', 'key', 'pub', 'png'];

const err_msg = (msg) => {
    return msg || "Usage: ./scan_fs.js <name of directory>";
};

const scan_fs = (directory, filter_lst, loptions) => {

    const default_options = {withFileTypes: true};  // Required
    const options = loptions || default_options;

    fs.readdir(directory, options, (err, files) => {
        if (!err) {
            files.forEach((dirent) => {
                if (dirent.name) {
                    if (conf.default_file_exclusions.search(dirent.name) > -1) {
                        // if (exclusion_filter(file.name)) {
                        console.log(`File Filtered: ${path.join(directory, dirent.name)}`);
                        // ignore entry
                    } else if (dirent.isFile()) {
                        if (conf.default_file_extensions_rgx.search(dirent.ext)) {
                            console.log(`POLICY INCLUSION: ${dirent.name}: ${dirent.extname}`);
                    } else if (dirent.isDirectory()) {
                        // console.log(`${path.join(directory, file.name)}`);
                        scan_fs(path.join(directory, dirent.name));
                    } else console.log(`Unknown File Type ${file}`)
                }
            });
        } else {
            if (err.code === 'ENOENT') {
                console.log(" Empty: " + directory);
            } else if (err.code === 'EPERM') {
                console.log("No Permissions on Directory: " + directory);
            } else if (err.code === 'EACCES') {
                console.log("Permission Denied: " + directory);
            } else if (err.code === 'EBADF') {
                console.log("Bad File Descriptor: " + directory);
            } else if (err.code === 'ENOTDIR') {
                console.log("not a directory" + directory);
            } else throw err;
        }
    });
}
module.export = scan_fs;

// Dump Directories if Needed
// /* TEST */
if (process.argv.length <= 2) {
    console.log(err_msg());
    process.exit(-1);
}

let dir = process.argv[2];
// todo check that directory exists here!
scan_fs(dir);


