'use strict';
// External Imports
import request from 'supertest';

// Local Imports
import conf from '../conf/conf.mjs';
import app from '../app.mjs';

suite('ScanFs_API', () => {
    let user_pw;
    suiteSetup(() => {
        user_pw = conf.servers.test_data.test_user;
    });
    suite('ScanFS Authenticated API Tests', () => {
        test('Has Default Home Page', done => {
            request(app)
                .get('/')
                .auth(user_pw[0], user_pw[1])
                .expect(200)
                .expect(/Welcome to Filesystem Artifact Scanner Home Page!/, done);
        });
        test('OPTIONS /', done => {
            request(app)
                .options('/')
                .auth(user_pw[0], user_pw[1])
                .expect(204)
                .expect('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD,OPTIONS', done);
        });
        test('GET /users', done => {
            request(app)
                .get('/users')
                .auth(user_pw[0], user_pw[1])
                .expect(200)
                .expect('Access-Control-Allow-Origin', '*')
                .expect(/GET \/users NOT IMPLEMENTED/, done);
            // });
        });
        test('PUT /users', done => {
            request(app)
                .put('/users')
                .auth(user_pw[0], user_pw[1])
                .expect(200)
                .expect(/PUT \/users NOT IMPLEMENTED/, done);
        });
        //TEST /discovery
        test('GET /discovery', done => {
            request(app)
                .get('/discovery')
                .auth(user_pw[0], user_pw[1])
                .expect(200)
                .expect(/GET \/discovery\/ NOT IMPLEMENTED/, done);
        });
        test('PUT /discovery', done => {
            request(app)
                .put('/discovery')
                .auth(user_pw[0], user_pw[1])
                .expect(200)
                .expect(/PUT \/discovery\/ NOT IMPLEMENTED/, done);
        });
        test('POST /discovery', done => {
            request(app)
                .post('/discovery')
                .auth(user_pw[0], user_pw[1])
                .expect(200)
                .expect(/POST \/discovery\/ NOT IMPLEMENTED/, done);
        });
        test('OPTIONS scans', done => {
            request(app)
                .options('/discovery')
                .auth(user_pw[0], user_pw[1])
                .expect(204)
                .expect('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD,OPTIONS', done);
        });
    });
    suite('Authenticated Admin Endpoints', () => {
        test('GET /admin', done => {
            request(app)
                .get('/admin')
                .auth(user_pw[0], user_pw[1])
                .expect(200, done);
        });
    });
});
