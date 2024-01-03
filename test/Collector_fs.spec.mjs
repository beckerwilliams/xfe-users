// author: ron williams
'esversion: 6'
'use strict'

// External Imports
import { assert, expect } from 'chai'
import conf from '../conf/conf.mjs'

// Internal Imports
import Collector from '../src/Collector.mjs'

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
        assert.instanceOf(scan_dirs, Array, `scan_dirs is Array: ${scan_dirs}: FAIL`)
    })
    test('collector is Collector', () => {
        assert.instanceOf(collector, Collector, 'New collector is NOT a collector')
    })
    test('collector CONSTRUCTOR(dir_paths)', done => {
        expect(() => {
            new Collector(scan_dirs)
        }).to.not.throw(Error)
        done()
    })
    test('new Collector(scan_dirs has required properties', done => {
        collector = new Collector(scan_dirs)
        expect(collector).to.have.property('d_paths')
        expect(collector).to.have.property('d_filters')
        expect(collector).to.have.property('fs_options')
        expect(collector).to.have.property('file_processor')
        done()
    })
    test('collect_fs(scandirs).', done => {
        // noinspection JSVoidFunctionReturnValueUsed
        expect(
            () => collector.collect_fs(single_dir).to.not.throw(Error)
        )
        done()
    })
})
