const request = require('supertest');
const app = require('./app');

// Configuere Test Authentication
let userpw = require('./test/test_pw.json').user
console.log("\n*** Beginning Tests of Module \'" + app.name + ".js\' ***");

// TEST Root
describe('App', () => {
    it('has the default page', done => {
        request(app)
            .get('/')
            .auth(userpw[0], userpw[1])
            .expect(200)
            .expect("X-Powered-By", "Express")
            .expect(/Welcome to Filesystem Artifact Scanner Home Page!/, done);
    });
});

describe('OPTIONS app', () => {
    it('supports OPTIONS /', done => {
        request(app)
            .options('/')
            .auth(userpw[0], userpw[1])
            .expect(204)
            .expect('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD,OPTIONS', done);
    });
});

// TEST /users
describe('GET users', () => {
    it('Supports GET /users', done => {
        request(app)
            .get('/users')
            .auth(userpw[0], userpw[1])
            .expect(200)
            .expect('Access-Control-Allow-Origin', '*')
            .expect(/GET \/users NOT IMPLEMENTED/, done);
    });
});
describe('PUT users', () => {
    it('Supports PUT /users', done => {
        request(app)
            .put('/users')
            .auth(userpw[0], userpw[1])
            .expect(200)
            .expect(/PUT \/users NOT IMPLEMENTED/, done);
    });
});

//TEST /scans
describe('GET scans', () => {
    it('supports GET /scans', done => {
        request(app)
            .get('/scans')
            .auth(userpw[0], userpw[1])
            .expect(200)
            .expect(/GET \/scans\/ NOT IMPLEMENTED/, done);
    });
});
describe('PUT scans', () => {
    it('supports PUT /scans', done => {
        request(app)
            .put('/scans')
            .auth(userpw[0], userpw[1])
            .expect(200)
            .expect(/PUT \/scans\/ NOT IMPLEMENTED/, done);
    });
});
describe('POST scans', () => {
    it('supports POST /scans', done => {
        request(app)
            .post('/scans')
            .auth(userpw[0], userpw[1])
            .expect(200)
            .expect(/POST \/scans\/ NOT IMPLEMENTED/, done);
    });
});

describe('OPTIONS scans', () => {
    it('supports OPTIONS /scans', done => {
        request(app)
            .options('/scans')
            .auth(userpw[0], userpw[1])
            .expect(204)
            .expect('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD,OPTIONS', done);
    });
});

/// Admin Endpoint Up (Write Separate Test file for Admin)
describe('Admin Endpoint', () => {
    it('Exposes /admin', done => {
        request(app)
            .get('/admin')
            .auth(userpw[0], userpw[1])
            .expect(200, done);
    });
});
