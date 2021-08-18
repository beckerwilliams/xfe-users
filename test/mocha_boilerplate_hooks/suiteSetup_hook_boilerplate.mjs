'use strict'
export const suiteSetup_hooks = {
    suiteSetup: [
        (done) => {
            // do something before every test,
            // then run the next hook in this array
        },
        async () => {
            // async or Promise-returning functions allowed
        }
    ]
}