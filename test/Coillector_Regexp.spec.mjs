// <FILE>
// author: ron williams
// email: ron.williams@infosecglobal.com
// date:
// author: ron williams
'use strict'

// External Imports
import chai from 'chai'
import escape_rgx from 'escape-string-regexp'

// Internal Imports
import conf from '../conf/conf.mjs'

const expect = chai.expect


// These Don't Work
suite('Regexp Tests', () => {

    // Setup Test Variables
    let test_path_exclusions = [
        ".idea",
        ".git",
        ".deps",
        ".pyenv.d",
        "working",
        "work",
        "tmp",
        "node_modules"
    ]

    let test_path_inclusions = [
        "test.pem",
        "test.der",
        "test.cer",
        "test.key",
        "test.pub",
        "test.png",
        "test.crt",
        "test.ca",
        "test.p12",
        "test.pfx",
        "test.pkcs7",
        "test.pkcs8",
        "test.pkcs11",
        "test.pkcs12"
    ]

    // Subject Regex to Test
    let path_exclusions = conf.collector.fs.filters.default_path_exclusions
    let path_inclusions = conf.collector.fs.filters.default_fext_selector

    // Run Tests
    test_path_exclusions.forEach(pathname => {
        test(`PATH NOT in Exclusion List: ${pathname}`, () => {
            expect(escape_rgx(pathname).search(path_inclusions)).below(0, "NOT IN Inclusions Failed")
        })
        test(`IN PATH Exclusion List: ${pathname}`, () => {
            expect(escape_rgx(pathname).search(path_exclusions)).above(-1, "IN Exclusions Failed")
        })

    })
    test_path_inclusions.forEach((pathname) => {
        test(`NOT In PATH Exclusion LIST ${pathname}`, () => {
            expect(escape_rgx(pathname).search(path_exclusions)).below(0, `IN Exclusions Failed: ${pathname}`)
        })
        test(`IN PATH Inclusion List: ${pathname}`, () => {
            expect(escape_rgx(pathname).search(path_inclusions)).above(-1, `IN Inclusion Failed: ${pathname}`)
        })
    })
})
