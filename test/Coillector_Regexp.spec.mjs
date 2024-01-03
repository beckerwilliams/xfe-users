'use strict'

// External Imports
import { expect } from 'chai'
import escape_rgx from 'escape-string-regexp'

// Internal Imports
import conf from '../conf/conf.mjs'

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
    suite('Test EXCLUDED File Paths', () => {
        test_path_exclusions.forEach(pathname => {
            test(`EXCLUDED PATH NOT in Inclusion List: ${pathname}`, () => {
                expect(escape_rgx(pathname).search(path_inclusions)).below(0, `FAIL: ${pathname}`)
            })
            test(`EXCLUDED IN PATH Exclusion List: ${pathname}`, () => {
                expect(escape_rgx(pathname).search(path_exclusions)).above(-1, `EFAIL: ${pathname}`)
            })
        })
    })
    suite('Test INCLUDED File Paths', () => {
        test_path_inclusions.forEach((pathname) => {
            test(`INCLUDED PATH NOT Exclusion LIST ${pathname}`, () => {
                expect(escape_rgx(pathname).search(path_exclusions)).below(0, `FAIL ${pathname}`)
            })
            test(`INCLUDED PATH IN Inclusion List: ${pathname}`, () => {
                expect(escape_rgx(pathname).search(path_inclusions)).above(-1, `FAIL : ${pathname}`)
            })
        })
    })
})
