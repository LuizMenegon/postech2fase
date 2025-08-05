const { DataTypes } = require('sequelize');
const { sequelize } = require("../config/sequelize");

const Discipline = sequelize.define('Discipline', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'teachers',
            key: 'ID'
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'disciplines',
    timestamps: true
});

module.exports = Discipline;
