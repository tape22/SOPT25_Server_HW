var express = require('express');
var router = express.Router();


router.use('/news', require('./news'));


router.get('./',(req,res)=>{
    res.send('not supported.');
})



module.exports = router;