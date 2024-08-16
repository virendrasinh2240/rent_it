const express = require("express");
const sequelize = require("../config/dbconnect");
const categoryRouter = require("../router/Category.router");
const mainCategoryRouter = require("../router/main_Category.router");
const colorRouter = require("../router/color.router");
const sizeRouter = require("../router/size.router");
const productRouter = require("../router/product.router");
require('dotenv').config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers setup
app.use(categoryRouter);
app.use(mainCategoryRouter);
app.use(colorRouter);
app.use(sizeRouter);
app.use(productRouter);

// Default route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Welcome!'
    });
});

// Health check route
app.get('/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        res.status(200).json({
            status: {
                message: "Connection has been established successfully.",
                code: 200,
                error: false
            }
        });
    } catch (error) {
        res.status(400).json({
            status: {
                message: `${error}`,
                code: 400,
                error: true
            }
        });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 400;
    error.message = error.message || "Error";
    res.status(error.statusCode).json({
        status: {
            message: error.message,
            code: error.statusCode,
            error: true
        }
    });
});

module.exports = app;
