'use strict'
/**
 * #  Set Operations SPEC
 *   - isSuperset
 *   - union
 *   - intersection
 *   - symmetricDifference
 *   - difference
 */
import {expect} from 'chai'
import {isSuperset, union, intersection, symmetricDifference, difference} from '../src/utils/set_operations.mjs'

suite('SetOperations', () => {
    // Test Values [value a, value b, [opt] test Value
    let supersetAB = [
        ['a', 'b', 'c', 'd', 'e'],
        ['b', 'c', 'd'],
        true]

    let unionAB = [
        ['a', 'b', 'c', 'd', 'e'],
        ['f', 'g', 'h', 'i', 'j'],
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    ]

    let intersectionAB = [
        ['a', 'b', 'c', 'd', 'e'],
        ['c', 'd', 'e', 'f', 'g'],
        ['c', 'd', 'e']
    ]

    let symmetricDifferenceAB = [
        ['a', 'b', 'c', 'd', 'e'],
        ['f', 'g', 'h', 'i', 'j'],
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    ]

    let symmetricDifferenceAB2 = [
        ['a', 'b', 'c', 'd', 'e'],
        ['d', 'e', 'f', 'g', 'h'],
        ['a', 'b', 'c', 'f', 'g', 'h']
    ]
    let differenceANotinB = [
        ['a', 'b', 'c', 'd', 'e'],
        ['d', 'e', 'f', 'g', 'h'],
        ['a', 'b', 'c']
    ]

    test('isSuperSet', done => {
        expect(isSuperset(
            new Set(supersetAB[0]),
            new Set(supersetAB[1])),
            done())
            .eq(supersetAB[2])
    })
    test('isUnion', done => {
        expect(union(
                unionAB[0],
                unionAB[1]),
            done())
            .eq(unionAB[2])
    })
    test('intersection', done => {
        expect(intersection(
                new Set(intersectionAB[0]),
                new Set(intersectionAB[1])),
            done())
            .eq(new Set(intersectionAB[2]), 'INVALID INTERSECTON')
    })
    test('symmetricDifference', done => {
        expect(symmetricDifference(
                symmetricDifferenceAB[0],
                symmetricDifferenceAB[1]),
            done())
            .eq(symmetricDifferenceAB[2])
    })
    test('symmetricDifference2', done => {
        expect(symmetricDifference(
                symmetricDifferenceAB2[0],
                symmetricDifferenceAB2[1]),
            done())
            .eq(symmetricDifferenceAB2[2])
    })
    test('difference', done => {
        expect(difference(
                differenceANotinB[0],
                differenceANotinB[1]),
            done())
            .eq(differenceANotinB[2])
    })
})
