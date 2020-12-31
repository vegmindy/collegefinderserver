const {DataTypes} = require("sequelize");
const db = require("../db");

const Favorites = db.define("favorites", {
    // schoolID: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    schoolName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    inState: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Favorites