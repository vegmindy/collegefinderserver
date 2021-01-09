const AccessControl = require('access-control');
const ac = new AccessControl();

ac.grant('student')
        .createOwn('favorites')
        .createOwn('accepted')
        .updateOwn('favorites')
        .updateOwn('accepted')
        .deleteOwn('favorites')
        .deleteOwn('accepted')
        .readOwn('favorites')
        .readOwn('accepted')
    .grant('admin')
        .createOwn('schools')
        .updateOwn('schools')
        .deleteOwn('schools')
        .readOwn('schools')


module.exports = ac;