const express = require('express')
const main_CategoryRouter = express.Router()
const { add_main_category, get_main_category ,update_main_category , delete_main_category} = require("../controller/main_Category.controller")

main_CategoryRouter.post('/add/main_category', add_main_category)
main_CategoryRouter.get('/get/main_category', get_main_category)
main_CategoryRouter.patch('/update/main_category', update_main_category)
main_CategoryRouter.delete('/delete/main_category',delete_main_category)
module.exports = main_CategoryRouter