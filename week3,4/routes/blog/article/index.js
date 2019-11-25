var express = require('express');
var router = express.Router({mergeParams: true});

// http:localhost:3000/blogs/blogIdx/articles
router.use('/',require('./articles'));
router.use('/:articleIdx/comments',require('./comments'));

module.exports = router;
