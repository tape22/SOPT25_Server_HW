var express = require('express');
var router = express.Router();

router.use('/blogs',require('./blog'));
router.use('/multerTest',require('./multerTest'));
router.use('/jwtTest',require('./jwtTest'));


module.exports = router;
