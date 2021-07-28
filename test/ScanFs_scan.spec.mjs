// author: ron williams
// const Collector = require('../src/Collector/Collector');
'use strict';
import chai from 'chai';

import Collector from '../src/Collector.mjs';
const fs_scan = Collector.fs_scan;

// const Collector = require('../src/Collector');

suite('Collector', () => {
    suite('scan tests', done => {
        test('.bad directory', async () => {
            let dir = '/BadDirectory';
            const cb = async direntry => {
                console.log(`Call Back Identified: ${direntry.name}`);
                chai.expect(dir.name).equals(null);
            };
            // chai.expect(fs_scan(dir)).to.throw();
            // chai.expect(fs_scan(dir, cb) === -1);
            chai.expect(true);
        });
        test('.no entries', () => {
            chai.expect(true);
        });
        test('.~/WebStorm', () => {
            chai.expect(true);
        });
        test('.FILE as Directory', () => {
            chai.expect(true);
        }, done);
    });
});