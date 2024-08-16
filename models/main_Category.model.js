const { DataTypes } = require('sequelize')
const sequelize = require('../config/dbconnect')


const Main_Category = sequelize.define('Main_Category', {

    main_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    main_category_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = Main_Category