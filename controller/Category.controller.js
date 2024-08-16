const { where } = require("sequelize");
const Category = require("../models/Category.model");
const Main_Category = require("../models/main_Category.model");
const { checkValidStringType } = require("../utils/validation")

exports.addcategory = async (req, res, next) => {
    try {
        const { category_name, main_category_id } = req.body;
        // console.log(req.body);

        if (!category_name) {
            throw new Error("Category name is required.");
        }

        checkValidStringType(category_name)

        if (!main_category_id) {
            throw new Error("please Enter main category id")
        }

        const category = await Category.create({
            category_name,
            main_category_id
        });

        return res.status(200).json({
            status: {
                message: "Successfully added category",
                code: 200,
                error: false
            },
            data: {
                category
            }
        });
    } catch (error) {
        next(error);
    }
};


exports.getallcategory = async (req, res, next) => {
    try {
        const { category_id } = req.query;

        let find_category;
        if (category_id) {
            find_category = await Category.findAll({
                where: { category_id },
                include: {
                    model: Main_Category,
                }
            });

            if (find_category.length === 0) {
                throw new Error("Provided category ID does not exist.");
            }
        } else {
            find_category = await Category.findAll({
                include: {
                    model: Main_Category
                }
            });

            if (find_category.length === 0) {
                throw new Error('No categories available!');
            }
        }

        const mainCategoryMap = {};

        find_category.forEach(category => {
            const mainCategory = category.Main_Category;

            if (!mainCategoryMap[mainCategory.main_category_id]) {
                mainCategoryMap[mainCategory.main_category_id] = {
                    main_category_id: mainCategory.main_category_id,
                    main_category_name: mainCategory.main_category_name,
                    Categories: []
                };
            }

            mainCategoryMap[mainCategory.main_category_id].Categories.push({
                category_id: category.category_id,
                category_name: category.category_name,
            });
        });

        const formattedData = Object.values(mainCategoryMap);

        return res.status(200).json({
            status: {
                message: "Successfully fetched all categories!",
                code: 200,
                error: false
            },
            data: formattedData
        });
    } catch (error) {
        next(error);
    }
};




exports.updatecategory = async (req, res, next) => {

    try {
        const { category_id, category_name } = req.body

        if (!Number.isInteger(category_id)) {
            throw new Error('Please Provide a valid category_id!');
        }

        const category = await Category.findOne({
            where: {
                category_id
            }
        })

        if (!category) {
            throw new Error("category is not exist")
        }

        category.category_name = category_name

        await category.save()

        res.status(200).json({
            status: {
                message: `Successfully  Category update`,
                code: 200,
                error: false
            },
            data: {
                category
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.deletecategory = async (req, res, next) => {
    try {

        const { category_id } = req.query

        if (!category_id) {
            throw new Error("please Enter category id ")
        }

        const category = await Category.destroy({
            where: {
                category_id
            }
        })

        if (category.length === 0) {
            throw new Error("category id is not exist")
        }

        return res.status(200).json({
            status: {
                message: "successfully delete category",
                code: 200,
                error: false
            }
        })

    } catch (error) {
        next(error)
    }
}