const { DataTypes } = require('sequelize');
const database = require('../config/database/connection');

const Character = database.define('Character', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    history: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // status: {
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: true
    // }
}, {
    tableName: 'Characters',
    updatedAt: false
});

module.exports = Character;