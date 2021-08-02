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
import default_target_directories from "./Collector_default_target_directories.mjs";
import conf from '../conf/conf.mjs';

//Constants
const SCAN_FS_OPTS = conf.collector.fs_scan.default_options;
const SCAN_FS_DEFAULT_PATH_EXCLUSIONS = conf.collector.fs_scan.filters.default_path_exclusions
const SCAN_FS_DIRECTORIES_DEFAULT = default_target_directories;
/***
 *
 */
export default class Collector {

    /***
     *
     * @param name
     * @param scan_fs_opts
     * @param scan_fs_directories
     */
    constructor(name, scan_fs_opts, scan_fs_directories) {
        this.name = 'Collector';
        this.scan_fs_opts = scan_fs_opts || SCAN_FS_OPTS;
        this.scan_fs_filter = SCAN_FS_DEFAULT_PATH_EXCLUSIONS;
        this.scan_fs_dirs = scan_fs_directories || SCAN_FS_DIRECTORIES_DEFAULT;
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
        this.scan_fs_filter = filter || this.scan_fs_filter;
        this.scan_fs_dirs.forEach(dir => {
            fs.readdir(dir, this.fs_scan_opts, (err, files) => {
                if (err) {
                    console.error(`Invalid Directory Entry: ${err}`);
                } else {
                    files.forEach(dir_entry => {
                        let full_path = path.join(dir, dir_entry.name);
                        if (escape_string_regexp(dir_entry.name).search(this.scan_fs_filter) > -1) {
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

