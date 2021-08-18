'use strict'
import {expect} from 'chai'
import path from 'path'
import CaFileEvent from '../src/file_processors/resp/CaFileEvent.mjs'
import {CaEvent} from '../src/file_processors/resp/CaFileEvent.mjs'

import conf from '../conf/conf.mjs'

suite('CryptoAnaltyics Event Object', done => {
    let default_path = "~/WebStorm"
    let implemented_properties = ['ts', 'url', 'type']
    let TestCaFileEvent = new CaFileEvent(default_path)
    let ca_event = CaEvent
    test('new CaFileEvent', () => {
        expect(TestCaFileEvent).to.be.instanceOf(CaFileEvent)
    })
    test('CaFileEvent has properties ts and url', () => {
        implemented_properties.forEach((prop) => {
            expect(TestCaFileEvent).to.have.property(prop)
        })
    })
})