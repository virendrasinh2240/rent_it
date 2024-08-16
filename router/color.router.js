const express = require("express");
const router = express.Router();
const { add_color, get_color ,update_color,delete_color} = require("../controller/color.controller");
const upload = require("../config/cloudinaryConfig");

router.post("/add/color", upload.single('color_image'), add_color);
router.post("/get/color",get_color)
router.post("/update/color",update_color)
router.post("/delete/color",delete_color)

module.exports = router;
