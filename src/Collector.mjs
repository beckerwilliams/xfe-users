/**
 * #ISG Inventory Collection Service
 * ##Collector describes artifact collection, whether from Network or File System Scans
 * - Todo HOST Inventory Schema
 * - Todo NETWORK Inventory Schema
 * - Todo Use Cases (Data analysis)
 *
 * Author: Ron Williams, CTO, INFOSEC GLOBAL Inc.
 * email: ron.williams@infosecglobal.com
 */

'use strict';
// External Imports
import {readdir} from 'fs';
import {join} from 'path';

// Internal Imports
import conf from '../conf/conf.mjs';
// local functions
/**
 * call back to process file identified by 'path'
 * @param path
 */
const mock_process = path => {
    console.log(`cb_process: path: ${path}`);
};

export default class Collector {

    /**
     *
     * @param discovery_paths
     * @param d_filters
     * @param cb_process
     */
    constructor(discovery_paths, d_filters, cb_process) {
        // if (discovery_paths) assert.typeOf(discovery_paths, 'array');
        this.d_paths = discovery_paths || conf.Collector.fs.default_discovery_paths;
        this.d_filters = d_filters || conf.Collector.fs.d_filters;
        this.cb_process = cb_process || mock_process;
        this.fs_options = conf.Collector.fs.default_options;
    };

    /**
     *
     * @param dir_targets
     * @param cb_process
     */
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
                                    this.cb_process(`TEST::File To Process: ${dirent.name}`);
                                }
                            } else console.info(`File ${full_path} is neither a directory nor a file`);
                        }
                    });
                }
            });
        });
    }
}
