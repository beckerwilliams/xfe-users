#!/usr/bin/env node
// file_inspector.js
//
// author: ron williams
// email: ron.williams@infosecglobal.com
// date: 2021.06.21T0755+0600


// Yara Selector for Extenstions etc.

//ignoring by magic number
//.cab - 4d 53 43 46
//.msi - D0 CF 11 E0 A1 B1 1A E1
const buf = require('buf');
const isCab = (file) => {
    return buf.readUInt32be(0) === 0x4d534346;
}
const isMsi = (file) => {
    return buf.readUInt32be(0) === 0xd0cf11e0 && buf.readUInt32be(0);
}

set bin_classifiers = {
    cab: buf.readUInt32be(0) === 0x4d534346,
    msi: buf.readUInt32be(0) === 0xd0cf11e0 && buf.readUInt32be(0)
}
