/**
 * SetFunctions for Arrays
 *
 * From JS Set Documentation
 */
/**
 *
 * @param set
 * @param subset
 * @returns {boolean}
 */
export const isSuperset = (set, subset) => {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false
        }
    }
    return true
}

/**
 *
 * @param setA
 * @param setB
 * @returns {Set<any>}
 */
export const union = (setA, setB) => {  //  A OR B
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

/**
 *
 * @param setA
 * @param setB
 * @returns {Set<any>}
 */
export const intersection = (setA, setB) => {  // A AND B
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

/**
 *
 * @param setA
 * @param setB
 * @returns {Set<any>}
 */
export const symmetricDifference = (setA, setB) => { // Exclusive A OR B (not both) Unique Union
    let _difference = new Set(setA)
    for (let elem of setB) {
        if (_difference.has(elem)) {
            _difference.delete(elem)
        } else {
            _difference.add(elem)
        }
    }
    return _difference
}

/**
 *
 * @param setA
 * @param setB
 * @returns {Set<any>}
 */
export const difference = (setA, setB) => {  // A not in B
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}