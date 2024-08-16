const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const Color = sequelize.define("Color", {
    color_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    color_image: {
        type: DataTypes.JSON,
        allowNull: false
    },
    color_code: {
        type: DataTypes.JSON, 
        allowNull: false
    },
    active_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});

module.exports = Color;
