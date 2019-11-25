var express = require('express');
var router = express.Router();

const multer = require('multer');
//const upload = multer({ dest: 'uploads/' }); // 이미지 받는 경로
const upload = require('../config/multer'); //config의 S3에 올라가는 경로
const cpUpload = upload.fields([{name:'thumbnail',maxCount:2}, { name: 'images', maxCount: 5 }]);  //json 배열이 각각 2개씩. fields에는 이 json배열이 온다

router.post('/single', upload.single('image'),(req,res)=>{  // 이미지를 어떤 이름으로 보낼것인지? image라는 키 값의~
    console.log(req.file);
    console.log(req.body);
    res.send({file: req.file,body:req.body});
});

router.post('/array',upload.array('photos',3),(req,res)=>{  //3개 이상이면 에러-> 캐치는 try catch로 하면 됨.
    console.log(req.files);
    console.log(req.body);
    res.send({file:req.files, body: req.body});
})

router.post('/fields',cpUpload, (req,res)=>{
    console.log(req.files);  //thumnail,image 무조건 배열로 들어온다.
    console.log(req.body);
    res.send({ file: req.files, body: req.body });
});

module.exports = router;