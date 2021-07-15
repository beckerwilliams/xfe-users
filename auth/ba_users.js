// ba_users.js
// This is the Test Basic Authorization Database for app.js
const users = require('../conf/conf').servers.test_data.db;
function ba_users() {
    return { users: users};
}
module.exports = ba_users