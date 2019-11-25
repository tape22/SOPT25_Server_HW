var express = require('express');
var router = express.Router();


// 블로그
router.get('/', (req, res) => {
    res.send('블로그 화면입니다.');
  });

module.exports = router;

