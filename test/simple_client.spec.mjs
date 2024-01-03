#!/usr/bin/env node
/**
 * filename.ext: Name, Short Descriptions
 * Description: Description
 *
 * author: Ron Williams, CTO, INFOSEC GLOBAL
 * author_email: ron.williams@infosecglobal.com
 * Copyright (C) 2001 INFOSEC GLOBAL, Inc., ALL RIGHTS RESERVED
 */
'use strict'
'use esversion: 6'
import { expect } from 'chai'
import { suite, suiteSetup } from 'mocha'
import { env } from 'process'

// Test Imports
import { default_headers, simple_client } from '../lib/simple_client.mjs'

suite('ISG Simple HTTP(S) Client', () => {
    let method, protocol, host, port, path, auth, sc
    suiteSetup(async () => {
            method = 'GET'
            protocol = 'https:'
            host = 'dcrunch.threatwonk.net'
            port = 57080
            path = '/isg-crypto-inventory'
            auth = env["DS_REQUEST_TOKEN"]
            sc = await simple_client(method, protocol, host, port, path, default_headers, auth)
        }
    )
    suite('Initial Tests', done => {
        test('Simple Client Exists', async () => {
            expect(await sc).to.exist
        })
        test('status 200', async () => {
            expect((await sc).statusCode).equals(200)
        })
        test('status "OK"', async () => {
            expect((await sc).statusMessage).equals('OK')
        })
        test('expected headers received', async () => {
            expect(sc.headers['content-type']).to.equal('application/json')
            expect((await sc).headers).to.have.property('server')
            expect((await sc).headers).to.have.property('set-cookie')
            expect((await sc).headers).to.have.property('date')
            expect((await sc).headers).to.have.property('content-length')
            expect((await sc).headers).to.have.property('cache-control')
            expect((await sc).headers).to.have.property('strict-transport-security')
            expect((await sc).headers).to.have.property('x-couch-request-id')
            expect((await sc).headers, 'FAILED').to.have.property('p3p')
            expect((await sc).headers).to.not.have.property('BOGUS-PROPERTY')
            // console.log(`headers: ${JSON.stringify((await sc).headers, null, 4)}`)
        })
        done
    })
})
