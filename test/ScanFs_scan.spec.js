// <FILE>
// author: ron williams
// email: ron.williams@infosecglobal.com
// date: 
const expect = require('chai').expect;

const ScanFs = require('../src/ScanFs');
const scanfs_opts = require('../conf/conf').ScanFs;

suite('ScanFs', done => {

    suite('scan tests', () => {
        test('- bad directory', () => {expect(true === true);});
        test(' - no entires', () => {});
        test('- ~/WebStorm', () => {});
        test('- FILE as Directory', () => {});
    });
});