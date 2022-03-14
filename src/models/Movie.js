const { DataTypes } = require('sequelize');
const database = require('../config/database/connection');

const Movie = database.define('Movie', {
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    qualification: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    },
    img: {
        type: DataTypes.STRING
    },
    // status: {
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: true
    // }
}, {
    tableName: 'Movies',
    updatedAt: false
});

module.exports = Movie;