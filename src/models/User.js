const { DataTypes } = require('sequelize');
const database = require('../config/database/connection');

const User = database.define('User', {
    id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'Users',
    updatedAt: false
});

module.exports = User;
  