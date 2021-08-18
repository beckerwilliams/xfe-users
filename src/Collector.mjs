/**
 * #ISG Inventory Collection Service
 * ##collector describes artifact collection, whether from Network or File System Scans
 * - Todo HOST Inventory Schema
 * - Todo NETWORK Inventory Schema
 * - Todo Use Cases (Data analysis)
 *
 * Author: Ron Williams, CTO, INFOSEC GLOBAL Inc.
 * email: ron.williams@infosecglobal.com
 */

'use strict'
import escape_rgxp from 'escape-string-regexp'
// External Imports
import {readdir} from 'fs'
import path, {join} from 'path'

// Environment Processing
import env from '../.env.mjs'
// Internal Imports
import conf from '../conf/conf.mjs'
// Default NODE_ENV is 'development'
if (!env.NODE_ENV) env.NODE_ENV = 'development'

// local constants
const default_fext_selector = conf.collector.fs.filters.default_fext_selector
const default_path_exclusions = conf.collector.fs.filters.default_path_exclusions
const default_discovery_paths = conf.collector.fs.default_discovery_paths

//// TEST
if (env.NODE_ENV === 'development') console.log(process.env)

/**
 *
 * @param f_path
 */
const default_file_processor = f_path => {
    //
    // Filter by Selection Criteria
    if (f_path.search(default_fext_selector) > -1) {  // Selection Criteria
        // Process File Here
        console.log(f_path)
    }  // else console.error(`Excluded (dir): ${fpath}`)
}

export default class Collector {
    /**
     *
     * @param dir_targets
     * @param d_filters
     * @param file_processor
     */
    constructor(dir_targets, d_filters, file_processor) {
        // properties
        this.d_paths = dir_targets || default_discovery_paths
        this.d_filters = d_filters || default_path_exclusions

        // required for file type discrimination in fs.readdir
        this.fs_options = conf.collector.fs.default_options

        // file processor - defaults to Included/Excluded report
        this.file_processor = file_processor || default_file_processor
    }

    collect_fs = (directory_targets, cb_process) => {
        // Update Instance Properties
        this.d_paths = directory_targets || this.d_paths
        this.file_processor = cb_process || this.file_processor

        this.d_paths.forEach(d_path => {

            readdir(d_path, this.fs_options, (err, files) => {

                if (err) {
                    console.error(`Invalid Directory Name: ${err.message}`)
                } else if (files) {

                    files.forEach(dirent => {
                        let full_path = join(d_path, dirent.name)
                        if (escape_rgxp(dirent.name).search(this.d_filters) === -1) {
                            if (dirent.isDirectory()) {
                                // Descend into dirent
                                this.collect_fs([full_path])
                            } else if (dirent.isFile()) {
                                // Process File
                                // default_file_processor(full_path)
                                if (this.file_processor) {
                                    this.file_processor(full_path)
                                }
                            } else if (process.env.NODE_ENV === 'dev') console.info(`File ${full_path} is neither a directory nor a file`)
                        } else if (process.env.NODE_ENV === 'dev') console.log(`readdir excluded file: ${full_path}`)
                    })
                }
            })
        })
    }
}
