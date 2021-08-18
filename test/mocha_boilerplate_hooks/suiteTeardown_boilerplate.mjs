'use strict'
export const suiteTeardown_Hook = {
    suiteTeardown: [
        () => {
            // do something before every test,
            // then run the next hook in this array
        },
        async () => {
            // async or Promise-returning functions allowed
        }
    ]
}