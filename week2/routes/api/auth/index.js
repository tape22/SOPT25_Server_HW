var express = require('express');
var router = express.Router();

router.use('/signin', require('./signin'));
router.use('/signup', require('./signup'));

router.get('./',(req,res)=>{
    res.send('not supported.');
})

module.exports = router;
