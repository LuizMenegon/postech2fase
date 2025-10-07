const { DataTypes } = require('sequelize');
const { sequelize } = require("../config/sequelize");

const Student = sequelize.define('Student', {
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
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    studentId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Número de matrícula do estudante'
    },
    course: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Curso do estudante'
    }
}, {
    tableName: 'students',
    timestamps: true
});

module.exports = Student;