var express = require('express');
var router = express.Router();


// news
router.get('/', (req, res) => {
    res.send('뉴스 화면입니다.');
  });

module.exports = router;