const express = require("express")
const { addcategory, getallcategory, updatecategory, deletecategory } = require("../controller/Category.controller")

const category_Router = express.Router()

category_Router.post("/add/category", addcategory)
category_Router.get("/get/category", getallcategory)
category_Router.patch("/update/category", updatecategory)
category_Router.delete("/delete/category", deletecategory)



module.exports = category_Router