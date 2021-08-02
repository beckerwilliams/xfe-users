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

// Local Imports
import fs_scan_default_directory_targets from "./scan_fs_default_directory_targets.mjs";
import conf from '../conf/conf.mjs';

//Constants
const FS_SCAN_OPTS = conf.collector.fs_scan.default_options;
const FS_SCAN_DEFAULT_PATH_EXCLUSIONS = conf.collector.fs_scan.filters.default_path_exclusions
const FS_SCAN_DIRECTORIES_DEFAULT = fs_scan_default_directory_targets;
/***
 *
 */
export default class Collector {

    /***
     *
     * @param name
     * @param fs_scan_opts
     * @param scan_fs_directories
     */
    constructor(name, fs_scan_opts, scan_fs_directories) {
        this.name = 'scan_fs_default_directory_targets';
        this.fs_scan_opts = fs_scan_opts || FS_SCAN_OPTS;
        this.filter = FS_SCAN_DEFAULT_PATH_EXCLUSIONS;
        this.scan_fs_dirs = scan_fs_directories || FS_SCAN_DIRECTORIES_DEFAULT;
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
    scan_fs = (dirs, filter) => {
        this.filter = filter || this.filter;
        this.scan_fs_dirs.forEach(dir => {
            fs.readdir(dir, this.fs_scan_opts, (err, files) => {
                if (err) {
                    console.error(`Invalid Directory Entry: ${err}`);
                } else {
                    files.forEach(dir_entry => {
                        let full_path = path.join(dir, dir_entry.name);
                        if (escape_string_regexp(dir_entry.name).search(this.filter) > -1) {
                            if (dir_entry.isFile()) {
                                this.processor(full_path);
                            } else if (dir_entry.isDirectory()) {
                                // Traverse to next Directory
                                this.scan_fs(full_path, filter);
                            }
                        }
                    });
                }
            });
        });
    };
}

