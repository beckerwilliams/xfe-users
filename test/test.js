const request = require('supertest');
const app = require('../app');

// Configuere Test Authentication
let userpw = require('./test_pw.json').user
console.log("\n*** Beginning Tests of Module \'" + app.name + ".js\' ***");

// TEST Root
describe('App', function () {
    it('has the default page', function (done) {
        request(app)
            .get('/')
            .auth(userpw[0], userpw[1])
            .expect(200)
            .expect("X-Powered-By", "Express")
            .expect(/Welcome to Filesystem Artifact Scanner Home Page!/, done);
    });
});

describe('OPTIONS app', function () {
    it('supports OPTIONS /', function (done) {
        request(app)
            .options('/')
            .auth(userpw[0], userpw[1])
            .expect(204)
            .expect('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD,OPTIONS', done);
    });
});

// TEST /users
describe('GET users', function () {
    it('Supports GET /users', function (done) {
        request(app)
            .get('/users')
            .auth(userpw[0], userpw[1])
            .expect(200)
            .expect('Access-Control-Allow-Origin', '*')
            .expect(/GET \/users NOT IMPLEMENTED/, done);
    });
});
describe('PUT users', function () {
    it('Supports PUT /users', function (done) {
        request(app)
            .put('/users')
            .auth(userpw[0], userpw[1])
            .expect(200)
            .expect(/PUT \/users NOT IMPLEMENTED/, done);
    });
});

//TEST /scans
describe('GET scans', function () {
    it('supports GET /scans', function (done) {
        request(app)
            .get('/scans')
            .auth(userpw[0], userpw[1])
            .expect(200)
            .expect(/GET \/scans NOT IMPLEMENTED/, done);
    });
});
describe('PUT scans', function () {
    it('supports PUT /scans', function (done) {
        request(app)
            .put('/scans')
            .auth(userpw[0], userpw[1])
            .expect(200)
            .expect(/PUT \/scans NOT IMPLEMENTED/, done);
    });
});
describe('POST scans', function () {
    it('supports POST /scans', function (done) {
        request(app)
            .post('/scans')
            .auth(userpw[0], userpw[1])
            .expect(200)
            .expect(/POST \/scans NOT IMPLEMENTED/, done);
    });
});

describe('OPTIONS scans', function () {
    it('supports OPTIONS /scans', function (done) {
        request(app)
            .options('/scans')
            .auth(userpw[0], userpw[1])
            .expect(204)
            .expect('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD,OPTIONS', done);
    });
});

/// Admin Tests
describe('Admin Endpoint', function () {
    it('Exposes /admin', function (done) {
        request(app)
            .get('/admin')
            .auth(userpw[0], userpw[1])
            .expect(200, done);
    });
});
