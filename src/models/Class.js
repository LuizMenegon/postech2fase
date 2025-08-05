const { DataTypes } = require('sequelize');
const { sequelize } = require("../config/sequelize");

const Class = sequelize.define('Class', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disciplineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'disciplines',
            key: 'ID'
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'classes',
    timestamps: true
});

module.exports = Class;