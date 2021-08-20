'use strict';
import path from 'path'
import conf from '../../conf/conf.mjs';

const default_fext_selector = conf.collector.fs.filters.default_fext_selector;

const default_file_processor = f_path => {
        // Filter by Selection Criteria
        if (path.extname(f_path).search(default_fext_selector) > -1) {  // Selection Criteria
            // Process File Here
            console.log(f_path)
    }
}
export default default_file_processor

// // test
// import {suite, suiteSetup} from 'mocha'
// suite('Test this', () => {
//     let file = "../../test/test.crt"
//     let fp = default_file_processor()
//     test('Some Test', done => {
//
//     })
// })