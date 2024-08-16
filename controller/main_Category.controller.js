const { where } = require("sequelize")
const Main_Category = require("../models/main_Category.model")
const { checkValidStringType } = require("../utils/validation")

exports.add_main_category = async (req, res, next) => {
    try {

        const { main_category_name } = req.body;

        if (!main_category_name) {
            throw new Error("Please Provided main_Category_name")
        }
        checkValidStringType(main_category_name)

        const main_Category = await Main_Category.create({
            main_category_name
        })

        res.status(200).json({
            status: {
                message: "Successfully Main Category Added!",
                code: 200,
                error: false
            },
            main_Category
        })

    } catch (error) {
        next(error)
    }
}

exports.get_main_category = async (req, res, next) => {
    try {

        const { main_Category_id } = req.query

        let main_Category;

        if (main_Category_id) {
            main_Category = await Main_Category.findAll({
                where: {
                    main_Category_id
                }
            })
        } else {
            main_Category = await Main_Category.findAll()
        }

        if (main_Category.length === 0) {
            throw new Error("main_Category are not available")
        }
        res.status(200).json({
            status: {
                message: "Successfully fetch all Main_Category",
                code: 200,
                error: false
            },
            data: {
                main_Category
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.update_main_category = async (req, res, next) => {
    try {

        const { main_Category_id, main_Category_name } = req.body

        if (!main_Category_id) {
            throw new Error("please provide main_Category_id")
        }
        if (!main_Category_name) {
            throw new Error("please provide main_Category_name")
        }

        if (!Number.isInteger(main_Category_id)) {
            throw new Error('Please Provide a valid main_Category_id!');
        }

        const main_Category = await Main_Category.findOne({
            where: {
                main_Category_id
            }
        })

        if (!main_Category) {
            throw new Error("main_Category are not found")
        }

        main_Category.main_Category_name = main_Category_name

        await main_Category.save()

        res.status(200).json({
            status: {
                message: "main_Category_name updated successfully",
                code: 200,
                error: false
            },
            data: {
                main_Category
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.delete_main_category = async (req, res, next) => {
    try {

        const { main_Category_id } = req.query

        if (!main_Category_id) {
            throw new Error("please provide main_Category_id")
        }
        const main_Category = await Main_Category.destroy({
            where: {
                main_Category_id
            }
        })

        if (!main_Category) {
            throw new Error("main_Category are not funde")
        }
        res.status(200).json({
            status: {
                message: "Successfully main_Category delete",
                code: 200,
                error: false
            }
        })
    } catch (error) {
        next(error)
    }
}