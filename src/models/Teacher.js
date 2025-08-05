const { DataTypes } = require('sequelize');
const { sequelize } = require("../config/sequelize");

const Teacher = sequelize.define('Teacher', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'teachers',
    timestamps: true
});

module.exports = Teacher;
