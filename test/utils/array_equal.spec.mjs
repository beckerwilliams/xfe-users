'use strict'
import { expect } from 'chai'

import simple_array_equal from '../../src/utils/simple_array_equal.mjs'


let array_1, array_1_equal, array_1_subset1, array_1_subset2, array_1_disjoint, array_1_superset
let array_1_compound, array_1_compound_duplicate

suiteSetup(() => {
        array_1 = ["one", "two", "three", "four", "five"]
        array_1_equal = ["one", "two", "three", "four", "five"]
        array_1_subset1 = ["one", "two", "three"]
        array_1_subset1 = ["four", "five"]
        array_1_disjoint = ["six", "seven", "eight", "nine", "ten"]
        array_1_superset = ["one", "two", "three", "four", "five", "six", "seven"]
        array_1_compound = [{"key1": "val1"}, {"key2": [{"s_key1": "s_val1"}]}]
        array_1_compound_duplicate = [{"key1": "val1"}, {"key2": [{"s_key1": "s_val1"}]}]
    }
)
suite('utils', () => {
    test('simple_array_equal', done => {
        expect(simple_array_equal(array_1, array_1_equal)).to.be.true
        done()
    })
    test('array not equal to subset', done => {
        expect(simple_array_equal(array_1, array_1_subset1)).to.be.false
        done()
    })
    test('array not equal to other subset', done => {
        expect(simple_array_equal(array_1, array_1_subset2)).to.be.false
        done()
    })
    test('array not equal to disjoint', done => {
        expect(simple_array_equal(array_1, array_1_disjoint)).to.be.false
        done()
    })
    test('array not equal to superset', done => {
        expect(simple_array_equal(array_1, array_1_superset)).to.be.false
        done()
    })
    // These tests prove the algorithm doesn't handle compound objects
    test('CANNOT Evaluate Arrays with compound object elements', done => {
        expect(simple_array_equal(array_1_compound, array_1_compound_duplicate)).to.be.false
        done()
    })
})

