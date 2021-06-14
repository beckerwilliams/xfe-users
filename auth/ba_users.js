// ba_users.js
// This is the Basic Authorization Database for app.js
var users = require('./lusers.json');
function ba_users() {
    return { users: users};
};

module.exports = ba_users