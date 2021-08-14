// <FILE>
// author: ron williams
// email: ron.williams@infosecglobal.com
// date: 
// author: ron williams
'use strict';

// External Imports
import chai from 'chai';
const expect = chai.expect;
import escape_rgx from 'escape-string-regexp';

// Internal Imports
import conf from '../conf/conf.mjs';


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
        "node_modules",
    ];

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
        "test.pkcs12",
        "test.pcks11"
    ];

    // Subject Regex to Test
    let path_exclusions = conf.Collector.fs.filters.excluded_paths;
    let path_inclusions = conf.Collector.fs.filters.selected_paths;

    // Run Tests
    test_path_exclusions.forEach(pathname => {
        test(`In Exclusion List: ${pathname}`, () => {
            expect(escape_rgx(pathname).search(path_exclusions)).above(-1, "Exclusions Failed");
        });
        test(`NOT In INCLUSION List: ${pathname}`, () => {
            expect(escape_rgx(pathname).search(path_inclusions)).eq(-1, "Inclusions Failed");
        });
    });
    test_path_inclusions.forEach((pathname) => {
        test(`Included in Inclusion List: ${pathname}`, () => {
            expect(escape_rgx(pathname).search(test_path_exclusions)).below(0, "Exclusions Failed");
        });
        test(`Excluded from INCLUSION LIST ${pathname}`, () => {
            expect(escape_rgx(pathname).search(test_path_inclusions)).below(0, "Inclusions Failed");
        });
    });
});
