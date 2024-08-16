const validator = require('validator')


exports.checkValidStringType = (value) => {
    try {

        if (typeof value !== "string") {
            throw new Error("Please Provide Alphabetic Value For Name or Title!")
        }
        return value
    } catch (error) {
        throw error
    }
}

exports.checkValidIntegerType = (value) => {
    try {
        let integerValue = parseInt(value);
        if (isNaN(integerValue) || !Number.isInteger(integerValue)) {
            throw new Error("Please provide a valid integer value");
        }
        return integerValue;
    } catch (error) {
        throw error;
    }
};