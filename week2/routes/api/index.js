var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/board', require('./board'));

router.use('/cafe', require('./cafe/cafe'));
router.use('/blog', require('./blog/blog'));
router.use('/news', require('./news/news'));
router.use('/news/like', require('./news/like/like'));

router.get('./',(req,res)=>{
    res.send('not supported.');
})



module.exports = router;