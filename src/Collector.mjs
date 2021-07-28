// Collector.mjs
// author: ron williams
// email: ron.williams@infosecglobal.com
//
/*
#ISG Inventory Collection

##Collector describes artifact collection, whether from Network or File System Scans
    - Todo HOST Inventory Schema
    - Todo NETWORK Inventory Schema
    - Todo Use Cases (Data analysis)

 */

// External Imports
import fs from 'fs';
import path from 'path';
import escape_string_regexp from 'escape-string-regexp';

// Internal Imports
import conf from '../conf/conf.mjs';
// const scan_fs_conf = conf.Collector.fs_scan.;

//// module ////
const Collector = {};
Collector.fs_scan = (dir, filter, cb) => {
    filter = filter | conf.Collector.fs_scan.filters;
    fs.readdir(dir, conf.Collector.fs_scan.default_options, (err, files) => {
        if (!err) { // We're good to evaluate
            files.forEach(dir_entry => {
                let full_path = path.join(dir, dir_entry.name);
                if (escape_string_regexp(dir_entry.name).search(filter) < 0) {
                    if (dir_entry.isFile()) {
                        Collector.fs_scan.processor(full_path);
                    } else if (dir_entry.isDirectory()) {
                        // Traverse to next Directory
                        Collector.fs_scan(full_path, filter);
                    }
                }
            });
        } else {
            console.error(`Directory Error: ${err}`);

        }
    });
    return Collector.fs_scan;
}

//// Processing Functions ////
Collector.fs_scan.processor = path => {
    console.log(`Processing ${path}`);
    // YARA Rules
    // LUA Rules
};
export default Collector;

