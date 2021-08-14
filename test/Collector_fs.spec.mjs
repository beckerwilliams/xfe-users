// author: ron williams
'use strict';

// External Imports
import {assert, expect} from 'chai';

// Intenral Imports
import Collector from '../src/Collector.mjs';
// todo: collect_fs, ...


let collector;
suite('Collector', () => {
    test('constructor', () => {
        collector = new Collector();
        assert.instanceOf(collector, Collector, 'New Collector is NOT a Collector');
    });
    test('collect_fs GOOD DIRECTORY', () => {
        expect(() => collector.collect_fs(['/Users/ron/WebStorm'])).to.not.throw(Error);
    });
});
