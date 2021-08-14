// <FILE>
// author: ron williams
// email: ron.williams@infosecglobal.com
// date: 
// author: ron williams
'use strict';
// External Imports
import assert from 'assert';
import escape_rgx from 'escape-string-regexp';

// Internal Imports
import conf from '../conf/conf.mjs';

// Setup Test Variables
let test_path_exclusions = [
    ".idea",
    ".git",
    ".deps",
    ".DS_Store",
    ".pyenv.d",
    "working",
    "work",
    "tmp",
    "node_modules",
    ""
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
    "test.pcks11",
    "test.pub"
];

// Subject Regex to Test
let path_exclusions = conf.Collector.fs.filters.excluded_paths;
let path_inclusions = conf.Collector.fs.filters.selected_paths;
console.log(`Exclusion List ${path_exclusions}`);
test_path_exclusions.forEach( path => {
    // search and compare against -1 yeilds MATCH or NO MATCH
    console.log(`path: ${escape_rgx(path)}: ${(escape_rgx(path).search(path_exclusions) > -1 ) ? "MATCH" : "NO-MATCH"}`);
    // console.log(`in exclusions ${escape_rgx(path).search(path_exclusions)}`);
    // assert(path.search(path_exclusions) > 1);
});