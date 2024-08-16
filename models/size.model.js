const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconnect');

const Size = sequelize.define('Size', {
    size_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    sizes: {
        type: DataTypes.JSON,  
        allowNull: false
    },
    active_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false
});

module.exports = Size;
