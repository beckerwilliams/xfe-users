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

'use strict';
// External Imports
import {readdir} from 'fs';
import {join} from 'path';

// Internal Imports
import conf from '../conf/conf.mjs';
// local functions
const mock_process = path => {
    console.log(`cb_process: path: ${path}`);
};

export default class Collector {

    constructor(discovery_paths, d_filters, cb_process) {
        // if (discovery_paths) assert.typeOf(discovery_paths, 'array');
        this.d_paths = discovery_paths || conf.Collector.fs.default_discovery_paths;
        this.d_filters = d_filters || conf.Collector.fs.d_filters;
        this.cb_process = cb_process || mock_process;
        this.fs_options = conf.Collector.fs.default_options;
    };

    collect_fs = (dir_targets, cb_process) => {
        this.d_paths = dir_targets || this.d_paths;
        this.cb_process = cb_process || this.cb_process;
        // assert.typeOf(dir_targets, 'array', `Invalid dir_target'`);
        dir_targets.forEach(path => {
            readdir(path, this.fs_options, (err, files) => {
                if (err) {
                    console.info(`Invalid Directory Path: ${err.message}`);
                } else {
                    files.forEach(dirent => {
                        let full_path = join(path, dirent.name);
                        console.log(full_path);  // DEBUG
                        /***
                         * We're at the individual file level
                         * Evaluate 'dirent' here
                         */
                        /**
                         * todo Filter Files from List, Here
                         */
                        if (dirent.name.search(this.d_filters) === -1) {
                            if (dirent.isDirectory()) {
                                this.collect_fs([full_path]);
                            } else if (dirent.isFile()) {
                                /***
                                 * todo File(s)
                                 */
                                console.log(`Processing File: ${dirent.name}`);
                                if (this.cb_process) {
                                    this.cb_process(`File To Process: ${dirent.name}`);
                                }
                            } else console.info(`File ${full_path} is neither a directory nor a file`);
                        }
                    });
                }
            });
        });
    }
}



// // External Imports
// import {readdir} from 'fs';
// import {join} from 'path';
// import {strict as assert} from 'assert';
// import conf from '../conf/conf.mjs';
// import escape_string_regexp from 'escape-string-regexp';
// // Local Imports
// import default_target_directories from "./Collector_default_target_directories.mjs";
//
// //Constants
// const SCAN_FS_OPTS = conf.collector.discover.default_options;
// const SCAN_FS_DEFAULT_PATH_EXCLUSIONS = conf.collector.discover.filters.d_filters;
// const SCAN_FS_DIRECTORIES_DEFAULT = default_target_directories;
// /***
//  *
//  */
// export default class Collector {
//
//     /***
//      *
//      * @param name
//      * @param scan_fs_opts
//      * @param scan_fs_directories
//      */
//     constructor(name, scan_fs_opts, scan_fs_directories) {
//         this.name = 'Collector';
//         this.scan_fs_opts = scan_fs_opts || SCAN_FS_OPTS;
//         this.scan_fs_filter = SCAN_FS_DEFAULT_PATH_EXCLUSIONS;
//         this.scan_fs_dirs = scan_fs_directories || SCAN_FS_DIRECTORIES_DEFAULT;
//     };
//
//     /***
//      *
//      * @param path
//      */
//     processor = path => {
//         console.log(`Processing ${path}`);
//         // YARA Rules
//         // LUA Rules
//     };
//     /***
//      *
//      * @param dir
//      * @param filter
//      */
//     scan_fs = (dirs, filter) => {
//         assert(typeof dirs, Array, "dirs is not type Array");
//         this.scan_fs_filter = filter || this.scan_fs_filter;
//         this.scan_fs_dirs = dirs || this.scan_fs_dirs;
//         try {
//             dirs.forEach(path => {
//                 readdir(path, this.scan_fs_opts, (err, files) => {
//                     if (err) {
//                         console.error(`Invalid Directory Entry: ${err}`);
//                     } else {
//                         files.forEach(dir_entry => {
//                             let full_path = join(path, dir_entry.name);
//                             if (escape_string_regexp(dir_entry.name).search(this.scan_fs_filter) > -1) {
//                                 if (dir_entry.isFile()) {
//                                     (full_path => {
//                                         console.log(`Full Path: ${full_path}`);
//                                     })(dir_entry.name);
//                                 } else if (dir_entry.isDirectory()) {
//                                     // Traverse to next Directory
//                                     this.scan_fs([full_path], filter);
//                                 }  // ELSE Ignore FIFOs, LINKS, etc.
//                             }
//                         });
//                     }
//                 });
//             });
//
//         } catch (err) {
//             console.error(`f'g dirs: ${err}`);
//         }
//     };
// }
