// author: ron williams
'use strict'

// External Imports
import {assert, expect} from 'chai'
import conf from '../conf/conf.mjs'

// Internal Imports
import Collector from '../src/Collector.mjs'

// todo: collect_fs, ...

suite('Collector', () => {
    let scan_dirs
    let single_dir
    let collector
    setup(() => {
        scan_dirs = conf.collector.fs.test_data['default-scan-directories']
        single_dir = conf.collector.fs.test_data['known-directory']
        collector = new Collector()
    })
    test('scan_dirs is Array', () => {
        assert.instanceOf(scan_dirs, Array, 'collector.scan_dirs Is Not An Array')
    })
    test('collector is Collector', () => {
        assert.instanceOf(collector, Collector, 'New collector is NOT a collector')
    })
    test('collector CONSTRUCTOR(dir_paths)', done => {
        expect(() => {
            new Collector(scan_dirs)
        }, done()).to.not.throw(Error)
    })
    test('new Collector(scan_dirs has required properties',  () => {
        collector = new Collector(scan_dirs)
        expect(collector).to.have.property('d_paths')
        expect(collector).to.have.property('d_filters')
        expect(collector).to.have.property('fs_options')
        expect(collector).to.have.property('file_processor')
    })
    test('collect_fs(scandirs).', done => {
        expect(() => collector.collect_fs(single_dir), 'ShowdNotThrowError', done()).to.not.throw(Error)
    })
    // // test('collect_fs Default Directories', done => {
    // //     console.log(`scan_dirs: count ${scan_dirs.length}: ${scan_dirs}`)
    // //     expect(() => (new Collector()).collect_fs(scan_dirs), 'collector FS Should Not Throw Exception', done).to.not.throw(Error)
    // // })
})
