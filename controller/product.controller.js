const Product = require("../models/product.model");
const Color = require("../models/color.model");
const Size = require("../models/size.model");
const Category = require("../models/Category.model");

const add_product = async (req, res) => {
    try {
        const {
            category_id, product_name, product_price, size_id, color_id,
            product_quantity, product_descriptions, discount,
            booking_start_date, booking_end_date
        } = req.body;

        console.log(req.body);

        const product_image = req.file?.path;
        console.log(product_image);

        if (!product_image) {
            throw new Error("Product image is required");
        }

        const category = await Category.findOne({
            where: { category_id },
        });
        if (!category) {
            throw new Error("Category not found");
        }

        const colorAll = await Color.findAll({
            where: { color_id },
            attributes: ['color_code', 'color_image']
        });
        console.log(colorAll);

        if (!colorAll || colorAll.length === 0) {
            throw new Error("Color not found");
        }

        const sizeAll = await Size.findAll({
            where: { size_id },
            attributes: ['size']
        });
        console.log(sizeAll);

        if (!sizeAll || sizeAll.length === 0) {
            throw new Error("Size not found");
        }

        const parsedProductPrice = parseInt(product_price.replace(/,/g, ''), 10);

        if (isNaN(parsedProductPrice)) {
            throw new Error("Invalid product price");
        }

        const currentDate = new Date();
        const startDate = new Date(booking_start_date);
        const endDate = new Date(booking_end_date);

        const available = currentDate <= endDate;

        if (!available) {
            return res.status(400).json({
                status: {
                    message: "Product is booked",
                    code: 400,
                    error: true
                }
            });
        }

        const productList = await Product.create({
            category_id,
            product_name,
            product_price: parsedProductPrice,
            size_id: sizeAll,
            color_id:colorAll,
            product_quantity,
            product_descriptions,
            discount,
            booking_start_date: startDate,
            booking_end_date: endDate,
            is_available: available,
            product_image
        });

        return res.status(200).json({
            status: {
                message: "Successfully added product",
                code: 200,
                error: false
            },
            data: {
                category_id,
                product_name,
                product_price: parsedProductPrice,
                size: sizeAll,
                color: colorAll,
                product_quantity,
                product_descriptions,
                discount,
                booking_start_date: startDate,
                booking_end_date: endDate,
                is_available: available,
                product_image
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: {
                message: error.message || "An error occurred",
                code: 400,
                error: true
            }
        });
    }
};




const get_product = async (req, res) => {
    try {

        const { product_id } = req.body

        if (!product_id) {
            throw new Error("product not found")
        }

        const getProduct = await Product.findOne({ where: { product_id } })

        return res.status(200).json({
            status: {
                message: "successfully get product",
                code: 200,
                error: false
            },
            data: {
                getProduct
            }
        })

    } catch (error) {

        return res.status(400).json({
            status: {
                message: error.message,
                code: 400,
                error: true
            }
        })
    }
}

const update_product = async (req, res) => {
    try {
        const { product_id, product_name, product_price } = req.body;

        console.log(req.body);
        const product_image = req.file.path;

        if (!req.file || !req.file.path) {
            throw new Error("Product image file is missing");
        }


        const product = await Product.findOne({ where: { product_id } });

        if (!product) {
            throw new Error("Product not found");
        }

        product.product_name = product_name;
        product.product_price = product_price;
        product.product_image = product_image;

        await product.save();

        return res.status(200).json({
            status: {
                message: "Successfully updated",
                code: 200,
                error: false
            },
            data: {
                product
            }
        });
    } catch (error) {
        return res.status(400).send({
            status: {
                message: error.message,
                code: 400,
                error: true
            }
        });
    }
};

const delete_product = async (req, res) => {
    try {

        const { product_id } = req.body

        if (!product_id) {
            throw new Error("product not found")
        }

        const product = await Product.destroy({ where: { product_id } })

        return res.status(200).json({
            status: {
                message: "successfully delete product",
                code: 200,
                error: false
            },
            data: {
                product
            }
        })



    } catch (error) {
        return res.status(400).json({
            status: {
                message: error.message,
                code: 400,
                error: true
            }
        })
    }
}

module.exports = {
    add_product,
    get_product,
    update_product,
    delete_product
};
