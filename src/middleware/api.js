const express = require("express");
const router = express.Router();

require("../db");

router.use('/auth',require('../routes/auth'));
router.use('/post',require('../routes/post'));










module.exports = router;