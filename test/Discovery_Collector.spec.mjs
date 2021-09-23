'use strict'
// External Imports
import request from 'supertest'
import app from '../app.mjs'

// Local Imports
import conf from '../conf/conf.mjs'

suite('Web Interface', () => {
    let user_pw
    suiteSetup(() => {
        user_pw = conf.discovery_api.test_data.test_user
    })
    suite('verify WebServer Home Page', () => {
        test('Has Default Home Page', done => {
            request(app)
                .get('/')
                .auth(user_pw[0], user_pw[1])
                .expect('content-type', /html/)
                .expect(/Welcome to Filesystem Artifact Scanner Home Page/)
                .expect(200, done)
        })
    })
    suite('FS Scans',  () => {
        test('Has Default Discovery Page', done => {
            request(app)
                .get('/discovery/?dd=WebStorm,bin,development')
                .auth(user_pw[0], user_pw[1])
                .expect('content-type', /application\/json/)
                .expect('content-length', '40')
                .expect({"title": "Artifact Discovery Scan Page"})
                .expect(200, done)
        })
    })
})

