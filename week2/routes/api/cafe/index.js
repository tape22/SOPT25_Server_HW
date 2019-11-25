var express = require('express');
var router = express.Router();

router.use('/cafe', require('./cafe'));


router.get('./',(req,res)=>{
    res.send('not supported.');
})



module.exports = router;