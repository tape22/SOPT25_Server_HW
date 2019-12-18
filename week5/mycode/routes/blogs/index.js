// blog의 인덱스
var express = require('express');
var router = express.Router({mergeParams: true});

router.use('/', require('./blog'));
router.use('/:blogIdx/articles', require('./articles'));

module.exports = router;