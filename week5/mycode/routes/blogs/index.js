// blog의 인덱스
var express = require('express');
var router = express.Router();

router.use('/',require('./blog'));

module.exports = router;