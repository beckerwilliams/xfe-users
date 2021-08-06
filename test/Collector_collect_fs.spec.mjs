// author: ron williams
// const Collector = require('../src/Collector/Collector');
'use strict';

// External Imports
import {assert, expect} from 'chai';
import Collector from '../src/Collector.mjs';
// todo: collect_fs, ...

let collector = new Collector();
suite('Collector', () => {
    test('constructor', () => {
        assert.instanceOf(collector, Collector, 'New Collector is NOT a Collector');
    });
    test('collect_fs', () =>{
        expect(()=> collector.collect_fs(['/Users/ron/WebStorm'])).to.not.throw(Error);
    })
});
