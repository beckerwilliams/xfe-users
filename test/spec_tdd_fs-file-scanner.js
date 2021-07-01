const request = require('supertest');
const app = require('../app');

// Configure Test Authentication
// let userpw = require('./test_pw.json').user;
// console.log("\n*** Beginning Tests of Module \'" + app.name + ".js\' ***");

// // TEST Root
// const setup = require('mocha').setup;
// const suite = require('mocha').suite;
// const suiteSetup = require('mocha').suiteSetup;
// const test = require('mocha').test;
// setup('tdd');
suite('fs-file-scanner tests', done => {
    let userpw;
    suiteSetup(() => {
        userpw = require('./test_pw.json').user;
    })
    suite('Test FS Scanner Console', done => {
        test('It has the Default Home Page', done => {
            request(app)
                .get('/')
                .auth(userpw[0], userpw[1])
                .expect(200)
                .expect(/Welcome to Filesystem Artifact Scanner Home Page!/, done);
        });
        test('supports OPTIONS /', done => {
            request(app)
                .options('/')
                .auth(userpw[0], userpw[1])
                .expect(204)
                .expect('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD,OPTIONS', done);
        });
        test('GET users', done => {
            // it('Supports GET /users', done => {
            request(app)
                .get('/users')
                .auth(userpw[0], userpw[1])
                .expect(200)
                .expect('Access-Control-Allow-Origin', '*')
                .expect(/GET \/users NOT IMPLEMENTED/, done);
            // });
        });
        test('PUT users', done => {
            request(app)
                .put('/users')
                .auth(userpw[0], userpw[1])
                .expect(200)
                .expect(/PUT \/users NOT IMPLEMENTED/, done);
        });
        //TEST /scans
        test('GET scans', done => {
            request(app)
                .get('/scans')
                .auth(userpw[0], userpw[1])
                .expect(200)
                .expect(/GET \/scans\/ NOT IMPLEMENTED/, done);
        });
        test('PUT scans', done => {
            request(app)
                .put('/scans')
                .auth(userpw[0], userpw[1])
                .expect(200)
                .expect(/PUT \/scans\/ NOT IMPLEMENTED/, done);
        });
        test('POST scans', done => {
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
    suite('Test Admin Endpoints', done => {
        test('Admin Endpoint', done => {
            request(app)
                .get('/admin')
                .auth(userpw[0], userpw[1])
                .expect(200, done);
        });
    });
});
