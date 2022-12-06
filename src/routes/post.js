const express = require('express');
const router = express.Router();
const jwt = require('../jwt');
const PostController = require('../controller/postcontroller');



router.post('/post',PostController.uploadpost)
router.get('/getdata',PostController.getData)







module.exports = router;
