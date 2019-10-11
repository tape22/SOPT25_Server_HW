var express = require('express');
var router = express.Router();


// 카페
router.get('/', (req, res) => {
    res.send('뉴스 좋아요 화면입니다.');
  });

module.exports = router;