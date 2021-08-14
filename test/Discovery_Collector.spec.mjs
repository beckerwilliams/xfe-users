'use strict';
// External Imports
import request from 'supertest';

// Local Imports
import conf from '../conf/conf.mjs';
import app from '../app.mjs';

suite('Collector Discovery', done => {
    let user_pw;
    suiteSetup(() => {
        user_pw = conf.servers.test_data.test_user;
    });
    suite('ScanFS Authenticated API Tests', done => {
        test('Has Default Home Page', done => {
            request(app)
                .get('/')
                .auth(user_pw[0], user_pw[1])
                .expect(200)
                .expect(/Welcome to Filesystem Artifact Scanner Home Page!/, done);
        });
    });
});
