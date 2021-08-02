// author: ron williams
// const Collector = require('../src/Collector/Collector');
'use strict';

// External Imports
import chai from 'chai';
const expect = chai.expect;
import conf from '../conf/conf.mjs';
import Collector from '../src/Collector.mjs'; // This is the instantiated object

const BAD_DIRECTORY = conf.collector.fs_scan.test["bad-directory"];

// These Don't Work
suite('Collector', done => {
    let test_collector = new Collector();
    test('Bad Directory Throws Error', () => {
        expect(test_collector.fs_scan).to.throw(Error);
    });
})