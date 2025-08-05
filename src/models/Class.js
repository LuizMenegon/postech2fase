const { sequelize } = require("../../models")

const Class = (sequelize, DataTypes) => {
    const aula = sequelize.define('Class', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Teachers',
                key: 'ID'
            }
        },
        description: {
            type: DataTypes.TEXT,
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
}