const express = require('express');
const router = express.Router();
const { add_size, get_size, update_size, delete_size } = require("../controller/size.controller");

router.post('/add/size', add_size);
router.post('/get/size', get_size);
router.post('/update/size', update_size);
router.post('/delete/size', delete_size);

module.exports = router;
