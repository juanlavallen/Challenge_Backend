const { Sequelize } = require('sequelize');
const config = require('../config');

const database = new Sequelize(
    config.database,
    config.username,
    config.password, {
    host: config.host,
    dialect: 'mysql'
});

module.exports = database; 