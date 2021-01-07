const Accepted = require('./accepted');
const Favorites = require('./favorites');
const User = require('./user');
const Schools = require('./schools')



User.hasMany(Favorites);
Favorites.belongsTo(User);

Accepted.belongsTo(User);
Favorites.belongsTo(Accepted);

User.hasMany(Accepted);

module.exports = {Accepted, Favorites, User, Schools}