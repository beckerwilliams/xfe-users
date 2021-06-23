const request = require('supertest');
const app = require('../app');

// Configure Test Authentication
// let userpw = require('./test_pw.json').user;
// console.log("\n*** Beginning Tests of Module \'" + app.name + ".js\' ***");

// TEST Root
// const mocha = require('mocha').mocha;
// const test = require('mocha').test;
// const suite = require('mocha').suite;
// const setup = require('mocha').setup;
// setup("bdd");
suite('fs-file-scanner tests', done => {
    let userpw;
    setup(() => {
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
    // suite('Test FS Scanner Agent', done =>
    //     // setTimeout((name) => {
    //     //     console.log(`\n***\nRunner Name: ${name}`);
    //     //     scan_filter.inclusive(/\.pem$|\.der$|\.cer$|\.png$|\.key$|\.pub$/)
    //     //     scan_filter.exclusive(/\.deps$|\.git$|\.gitignore|\.pyenv.d$|node_modules|tmp|work|working/)
    //     //     console.log(`ScanFilter: ${scan_filter.name}, inclusive regex: ${scan_filter.inclusive()}, exclusive regex: ${scan_filter.exclusive()}`);
    //     //
    //     //     // console.log(`\n***\nChange Inclusive Filter: ${scan_filter.inclusive("\.xyz$|\.abc$|\.nada$")}`);
    //     //     console.log(`Change Inclusive Filter: ${scan_filter.inclusive("")}`);
    //     //     // console.log(`Get Exclusive Filter: ${scan_filter.exclusive("ace$|\.tmp$")}`);
    //     //     console.log(`Get Exclusive Filter: ${scan_filter.exclusive("")}`);
    //     //     console.log(`Get Inclusive Filter: ${scan_filter.inclusive("new inclusion filter")}`);
    //     //     console.log(`Get Exclusive Filter: ${scan_filter.exclusive("new exclusion filter")}`);
    //     // }, 2000, "Filters");
    // });
})
;

// describe('App', done =>  {
//     it('has the default page', done => {
//         request(app)
//             .get('/')
//             .auth(userpw[0], userpw[1])
//             .expect(200)
//             .expect("X-Powered-By", "Express")
//             .expect(/Welcome to Filesystem Artifact Scanner Home Page!/, done);
//     });
// });

// describe('OPTIONS app', done =>  {
//     it('supports OPTIONS /', done => {
//         request(app)
//             .options('/')
//             .auth(userpw[0], userpw[1])
//             .expect(204)
//             .expect('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD,OPTIONS', done);
//     });
// });

// TEST /users
// describe('GET users', done =>  {
//     it('Supports GET /users', done => {
//         request(app)
//             .get('/users')
//             .auth(userpw[0], userpw[1])
//             .expect(200)
//             .expect('Access-Control-Allow-Origin', '*')
//             .expect(/GET \/users NOT IMPLEMENTED/, done);
//     });
// });
// describe('PUT users', done =>  {
//     it('Supports PUT /users', done => {
//         request(app)
//             .put('/users')
//             .auth(userpw[0], userpw[1])
//             .expect(200)
//             .expect(/PUT \/users NOT IMPLEMENTED/, done);
//     });
// });
//
// //TEST /scans
// describe('GET scans', done =>  {
//     it('supports GET /scans', done => {
//         request(app)
//             .get('/scans')
//             .auth(userpw[0], userpw[1])
//             .expect(200)
//             .expect(/GET \/scans\/ NOT IMPLEMENTED/, done);
//     });
// });
// describe('PUT scans', done =>  {
//     it('supports PUT /scans', done => {
//         request(app)
//             .put('/scans')
//             .auth(userpw[0], userpw[1])
//             .expect(200)
//             .expect(/PUT \/scans\/ NOT IMPLEMENTED/, done);
//     });
// });
// describe('POST scans', done =>  {
//     it('supports POST /scans', done => {
//         request(app)
//             .post('/scans')
//             .auth(userpw[0], userpw[1])
//             .expect(200)
//             .expect(/POST \/scans\/ NOT IMPLEMENTED/, done);
//     });
// });
//
// describe('OPTIONS scans', done =>  {
//     it('supports OPTIONS /scans', done => {
//         request(app)
//             .options('/scans')
//             .auth(userpw[0], userpw[1])
//             .expect(204)
//             .expect('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,HEAD,OPTIONS', done);
//     });
// });
//
// /// Admin Endpoint Up (Write Separate Test file for Admin)
// describe('Admin Endpoint', done =>  {
//     it('Exposes /admin', done => {
//         request(app)
//             .get('/admin')
//             .auth(userpw[0], userpw[1])
//             .expect(200, done);
//     });
// });
