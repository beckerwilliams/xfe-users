// author: ron williams
'use strict'

// External Imports
import {assert, expect} from 'chai'
import conf from '../conf/conf.mjs'

// Internal Imports
import Collector from '../src/Collector.mjs'

// todo: collect_fs, ...

suite('Collector', () => {
    let collector
    let scan_dirs
    let single_dir
    suiteSetup(() => {
        scan_dirs = conf.collector.fs.test_data['default-scan-directories']
        single_dir = conf.collector.fs.test_data['known-directory']
        collector = new Collector()
    })
    test('scan_dirs is Array', done => {
        assert.instanceOf(scan_dirs, Array, 'collector.scan_dirs Is Not An Array')
        done()
    })
    test('collector is Collector', done => {
        collector = new Collector()
        assert.instanceOf(collector, Collector, 'New collector is NOT a collector')
        done()
    })
    // test('collect_fs (single) GOOD DIRECTORY', done => {
    //     // collector = new Collector()
    //     expect(() => collector.collect_fs(single_dir)).to.not.throw(Error)
    //     done()
    // })
    // // test('collect_fs Default Directories', done => {
    // //     console.log(`scan_dirs: count ${scan_dirs.length}: ${scan_dirs}`)
    // //     expect(() => (new Collector()).collect_fs(scan_dirs), 'collector FS Should Not Throw Exception', done).to.not.throw(Error)
    // // })
})
