const Size = require('../models/size.model');

const add_size = async (req, res) => {
    try {
        const { sizes, active_status } = req.body;

        if (!sizes || !Array.isArray(sizes) || sizes.length === 0) {
            throw new Error("Please provide an array of sizes!");
        }

        const sizeEntry = await Size.create({
            sizes,
            active_status: active_status !== undefined ? active_status : true
        });

       res.status(200).json({
            status: {
                message: "Successfully added sizes",
                code: 200,
                error: false
            },
            data: {
                size_id: sizeEntry.size_id,
                sizes: sizeEntry.sizes,
                active_status: sizeEntry.active_status
            }
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const get_size = async (req, res, next) => {
    try {
        const { size_id } = req.body;

        let size;

        if (size_id) {
            size = await Size.findOne({
                where: { size_id }
            });
            if (!size) {
                throw new Error(`Provided size_id: ${size_id} does not exist.`);
            }
        } else {
            size = await Size.findAll({});
        }

        if (size.length === 0) {
            throw new Error('Sizes are empty.');
        }

        res.status(200).json({
            status: {
                message: "Successfully fetched size",
                code: 200,
                error: false
            },
            data: {
                size
            }
        });

    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
};

const update_size = async (req, res, next) => {
    try {
        const { size_id, size, active_status } = req.body;

        if (!size_id) {
            throw new Error('Please provide size_id');
        }

        const update_size = await Size.findOne({
            where: { size_id }
        });

        if (!update_size) {
            throw new Error(`Provided size_id does not exist.`);
        }

        if (size) {
            update_size.size = size;
        }

        if (typeof active_status !== 'undefined') {
            convertStringToBoolean(active_status);
            update_size.active_status = active_status;
        }

        await update_size.save();

        res.status(200).json({
            status: {
                message: "Size successfully updated",
                code: 200,
                error: false
            },
            data: {
                update_size
            }
        });
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
};

const delete_size = async (req, res, next) => {
    try {
        const { size_id } = req.body;

        if (!size_id) {
            throw new Error('Please provide size_id');
        }

        const delete_size = await Size.destroy({
            where: { size_id }
        });

        if (!delete_size) {
            throw new Error(`Provided size_id does not exist.`);
        }

        res.status(200).json({
            status: {
                message: "Successfully deleted size",
                code: 200,
                error: false
            }
        });

    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
};

module.exports = {
    add_size,
    get_size,
    update_size,
    delete_size
};
