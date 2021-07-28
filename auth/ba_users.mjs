// ba_users.mjs
// This is the Test Basic Authorization Database for app.mjs
import conf from './test_auth_db.mjs';
const users = conf.servers.test_data.db;

function ba_users() {
    return {users: users};
}

export default ba_users;
