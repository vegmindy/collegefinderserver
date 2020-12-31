const {DataTypes} = require("sequelize");
const db = require("../db");

const Accepted = db.define("accepted", {
    schoolID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    schoolName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inState: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    Accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    pros: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cons: {
        type: DataTypes.STRING,
        allowNull: true
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true  
    },
    top: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
})

module.exports = Accepted