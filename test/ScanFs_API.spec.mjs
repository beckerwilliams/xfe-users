import request from 'supertest';

import conf from '../conf/conf.mjs';

// const server_opts = require('../CONF/CONF.mjs').servers;
import app from '../app.mjs';
console.log(`app name ${app.name}`)
suite('ScanFs_API', done => {
    let userpw;
    suiteSetup(() => {
        userpw = conf.servers.test_data.test_user;
    });
    suite('ScanFS Authenticated API Tests', done => {
        test('Has Default Home Page', done => {
            request(app)
                .get('/')
                .auth(userpw[0], userpw[1])
                .expect(200)
                .expect(/Welcome to Filesystem Artifact Scanner Home Page!/, done);
        });
        test('OPTIONS /', done => {
            request(app)
                .options('/')
                .auth(userpw[0], userpw[1])
                .expect(204)
                .expect('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD,OPTIONS', done);
        });
        test('GET /users', done => {
            request(app)
                .get('/users')
                .auth(userpw[0], userpw[1])
                .expect(200)
                .expect('Access-Control-Allow-Origin', '*')
                .expect(/GET \/users NOT IMPLEMENTED/, done);
            // });
        });
        test('PUT /users', done => {
            request(app)
                .put('/users')
                .auth(userpw[0], userpw[1])
                .expect(200)
                .expect(/PUT \/users NOT IMPLEMENTED/, done);
        });
        //TEST /scans
        test('GET /scans', done => {
            request(app)
                .get('/scans')
                .auth(userpw[0], userpw[1])
                .expect(200)
                .expect(/GET \/scans\/ NOT IMPLEMENTED/, done);
        });
        test('PUT /scans', done => {
            request(app)
                .put('/scans')
                .auth(userpw[0], userpw[1])
                .expect(200)
                .expect(/PUT \/scans\/ NOT IMPLEMENTED/, done);
        });
        test('POST /scans', done => {
            request(app)
                .post('/scans')
                .auth(userpw[0], userpw[1])
                .expect(200)
                .expect(/POST \/scans\/ NOT IMPLEMENTED/, done);
        });
        test('OPTIONS scans', done => {
            request(app)
                .options('/scans')
                .auth(userpw[0], userpw[1])
                .expect(204)
                .expect('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD,OPTIONS', done);
        });
    });
    suite('Authenticated Admin Endpoints', done => {
        test('GET /admin', done => {
            request(app)
                .get('/admin')
                .auth(userpw[0], userpw[1])
                .expect(200, done);
        });
    });
});
