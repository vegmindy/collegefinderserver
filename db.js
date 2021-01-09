const {Sequelize} = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, {
    // host: 'localhost',
    dialect: 'postgres'
});

module.exports = db;

// const {Sequelize} = require("sequelize");

// const db = new Sequelize(process.env.DB_CONNECTION_STRING);

// module.exports = db;