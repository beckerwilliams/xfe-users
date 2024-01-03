'use strict'
import {expect} from 'chai'
import CaFileEvent from '../src/file_processors/resp/CaFileEvent.mjs'

suite('CryptoAnaltyics Event Object', () => {
    let default_path = "~/WebStorm"
    let implemented_properties = ['ts', 'url', 'type']
    let TestCaFileEvent = new CaFileEvent(default_path)
    // let ca_event = CaEvent  // todo include in TESTS
    test('new CaFileEvent', () => {
        expect(TestCaFileEvent).to.be.instanceOf(CaFileEvent)
    })
    test('CaFileEvent has properties ts and url', () => {
        implemented_properties.forEach((prop) => {
            expect(TestCaFileEvent).to.have.property(prop)
        })
    })
})