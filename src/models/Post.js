const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Post = sequelize.define('Post', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 255]
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [20, 10000]
    }
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  authorType: {
    type: DataTypes.ENUM('teacher', 'student'),
    allowNull: false,
    defaultValue: 'teacher',
    comment: 'Tipo do autor: teacher ou student'
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'ID do autor (teacher ou student)'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'posts',
  timestamps: true
});

module.exports = Post;