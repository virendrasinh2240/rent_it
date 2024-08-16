const expres = require("express")
const router = expres.Router()
const { add_product,get_product,update_product ,delete_product} = require("../controller/product.controller")
const upload = require("../config/cloudinaryConfig")

router.post("/add/product", upload.single('product_image'),add_product)
router.post("/get/product",get_product)
router.post("/update/product", upload.single('product_image'),update_product)
router.post("/delete/product",delete_product)

module.exports=router