var express = require('express');
var router = express.Router({mergeParams: true});

// http:localhost:3000/blogs 까진 들어온 상태
router.use('/',require('./blogs'));
// http:localhost:3000/blogs/1/articles하면 article 폴더로 들어가기
router.use('/:blogIdx/articles',require('./article'));


module.exports = router;
