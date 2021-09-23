'use strict'
const simple_array_equal = (a, b) => {
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false
    }
    return true
}
export default simple_array_equal