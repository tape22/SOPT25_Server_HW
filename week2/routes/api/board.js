var express = require('express');
var router = express.Router();


//보드
router.get('/', (req, res) => {
  res.send('게시판입니다.');
});


module.exports = router;