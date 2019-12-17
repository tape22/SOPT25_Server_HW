var express = require('express');
var router = express.Router();

router.use('/user',require('./user'));
router.use('/blogs',require('./blog'));
module.exports = router;
