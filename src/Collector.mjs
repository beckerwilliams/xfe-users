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
import CONF from '../conf/conf.mjs';
const FS_SCAN_OPTS = CONF.collector.fs_scan.default_options;
// const FS_SCAN_BAD_DIRECTORY = CONF.collector.fs_scan.test["bad-directory"];
// const FS_SCAN_EMPTY_DIRECTORY = CONF.collector.fs_scan.test["empty-directory"];
// const FS_SCAN_FILE_AS_DIRECTORY = CONF.collector.fs_scan.test["file-as-directory"];
const FS_SCAN_KNOWN_DIRECTORY = CONF.collector.fs_scan.test["known-directory"];
const FS_SCAN_DEFAULT_PATH_EXCLUSIONS = CONF.collector.fs_scan.filters.default_path_inclusions;

import {__esModule} from "node-agent";

class Collector {
    /***
     *
     * @param dir
     * @param filter
     */

    /***
     *
     * @param name
     */
    constructor(name) {
        this.name = name | __esModule;
        this.fs_scan_opts = FS_SCAN_OPTS;
        this.known_dir = FS_SCAN_KNOWN_DIRECTORY;
        this.filter = FS_SCAN_DEFAULT_PATH_EXCLUSIONS;
    };
    /***
     *
     * @param path
     */
    processor = path => {
        console.log(`Processing ${path}`);
        // YARA Rules
        // LUA Rules
    };
    /***
     *
     * @param dir
     * @param filter
     */
    fs_scan = (dir, filter) => {
        this.filter = filter | this.filter;
        fs.readdir(dir, this.fs_scan_opts, (err, files) => {
            if (err) {
                console.error(`fs.readdir.error: ${err}`);
            } else {
                files.forEach(dir_entry => {
                    let full_path = path.join(dir, dir_entry.name);
                    if (escape_string_regexp(dir_entry.name).search(this.filter) > -1) {
                        if (dir_entry.isFile()) {
                            this.processor(full_path);
                        } else if (dir_entry.isDirectory()) {
                            // Traverse to next Directory
                            this.fs_scan(full_path, filter);
                        }
                    }
                });
            }
        });
    };
}
export default Collector;
