const Color = require('../models/color.model');

const add_color = async (req, res) => {
    try {
        const { color_code } = req.body;
        const color_image = req.file.path;

        if (!color_code || !/^#[0-9A-Fa-f]{6}$/.test(color_code)) {
            throw new Error(`Invalid color_code. Ensure it includes "#" and is a valid hex color code.`)
        }
        if (!color_image) {
            throw new Error("please provide color image")
        }

        const newColor = await Color.create({ color_image, color_code });
        console.log('newColor:', newColor);

        res.status(200).json({
            status:{
                message:"successfulyy color add",
                code:200,
                error:false
            },
            data:{
                newColor
            }
        });

    } catch (error) {
        console.error('Error adding color:', error);
        res.status(500).json({ error: error.message });
    }
};

const get_color = async (req, res) => {
    try {
        const { color_id } = req.body

        if (!color_id) {
            throw new Error("color_id  is not found")
        }

        const colorData = await Color.findAll({
            where: { color_id }
        })
        res.status(200).json({ colorData })

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const update_color = async (req, res) => {

    try {
        const { color_id, color_code } = req.body

        const color = await Color.findOne({ where: { color_id } })

        if (!color_id) {
            throw new Error("color_id is not found")
        }

        color.color_code = color_code

        await color.save()

        res.status(200).json({ message: "color update successfully", color })

    } catch (error) {

        res.status(404).json({ error: error.message })
    }
}

const delete_color = async (req, res) => {
    try {
        const { color_id } = req.body

        const color = await Color.destroy({ where: { color_id } })

        if (!color) {
            throw new Error("color is not found")
        }
        res.status(200).json({ message: "successfuly delete" })

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
module.exports = {
    add_color,
    get_color,
    update_color,
    delete_color
};
