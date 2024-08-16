const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");
const Categories = require("../models/Category.model")

const Product = sequelize.define("Product", {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size_id: {
        type: DataTypes.JSON,
        allowNull: false
    },
    color_id: {
        type: DataTypes.JSON,
        allowNull: false
    },
    product_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_descriptions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    booking_start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    booking_end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    is_available :{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
}, {
    timestamps: false
});

Categories.hasMany(Product, { foreignKey: "category_id" })
Product.belongsTo(Categories, { foreignKey: "category_id" })


module.exports = Product;
