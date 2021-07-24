// author: ron williams
// const ScanFs = require('../src/ScanFs/ScanFs');
'use strict';
const ScanFs = require('../src/ScanFs');

suite('ScanFs', () => {
    suite('scan tests', done => {
        const expect = require('chai').expect;
        test('.bad directory', async () => {
            let dir = '/BadDirectory';
            const cb = async direntry => {
                console.log(`Call Back Identified: ${direntry.name}`);
                expect(dir.name).equals(null);
            };
            expect(ScanFs.scan(dir, cb)).to.throw('ENOENT');
            // expect(true);
        });
        test('.no entries', () => {
            expect(true);
        });
        test('.~/WebStorm', () => {
            expect(true);
        });
        test('.FILE as Directory', () => {
            expect(true);
        }, done);
    });
});