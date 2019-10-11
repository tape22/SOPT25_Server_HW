var express = require('express');
var router = express.Router();

router.use('/blog', require('./blog'));

router.get('./',(req,res)=>{
    res.send('not supported.');
})


module.exports = router;
