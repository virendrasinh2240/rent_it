const { DataTypes } = require("sequelize")
const sequelize = require("../config/dbconnect")
const Main_Category = require("./main_Category.model")

const Category = sequelize.define("Category", {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    main_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})


Category.belongsTo(Main_Category, { foreignKey: "main_category_id", onDelete: "CASCADE", onUpdate: "CASCADE" })
Main_Category.hasMany(Category, { foreignKey: "main_category_id", onDelete: "CASCADE", onUpdate: "CASCADE" })

module.exports = Category