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
const fs = require('fs');
const path = require("path");

const err_msg = () => {
    return msg || "Usage: ./dir_list.js <name of directory> to scan";
};

const scan_fs = (directory, filter_lst, loptions) => {

    const default_options = {withFileTypes: true};  // Required
    const options = loptions || default_options;

    fs.readdir(directory, options, (err, files) => {
        const default_exclusion_list = ['.keepme', '.pyenv.d', 'node_modules', 'Library', '.deps', '.git', 'node', '.gitignore', 'tmp', 'work', 'working'].sort();
        const exclusion_filter = (filename, excluded_names) => {
            excluded_names = excluded_names || default_exclusion_list;
            return excluded_names.includes(filename);
        }
        if (!err) {
            files.forEach((file) => {
                if (file.name) {
                    if (default_exclusion_list.includes(file.name)) {
                    // if (exclusion_filter(file.name)) {
                        console.log(`File Filtered: ${path.join(directory, file.name)}`);
                    } else if (file.isFile())
                        console.log(`${path.join(directory, file.name)} :f`);
                    else if (file.isDirectory()) {
                        console.log(`${path.join(directory, file.name)} :d`);
                        scan_fs(path.join(directory, file.name));
                    }
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
/* TEST */
if (process.argv.length <= 2) {
    console.log(err_msg());
    process.exit(-1);
}

let dir = process.argv[2];
// todo check that directory exists here!
scan_fs(dir);


