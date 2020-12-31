const Accepted = require('./accepted');
const Favorites = require('./favorites');
const User = require('./user');
const Schools = require('./schools')

// // one to one
// User.hasOne(Account)
// Account.belongsTo(User)

// // one to many
// User.hasMany(Accepted)
// Accepted.belongsTo(User)

// User.hasMany(Favorites)
// Favorites.belongsTo(User)

module.exports = {Accepted, Favorites, User, Schools}