var express = require('express');
var router = express.Router();


//로그인
router.get('/', (req, res) => {
    res.send('로그인입니다.');
  });

module.exports = router;