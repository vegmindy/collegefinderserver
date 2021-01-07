const {DataTypes} = require("sequelize");
const db = require("../db");

const Schools = db.define("schools", {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    schoolName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    generalPhone: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Schools