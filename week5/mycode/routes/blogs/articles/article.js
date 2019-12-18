const express = require('express');
const router = express.Router({mergeParams: true});

const utils = require('../../../modules/util/utils');
const stC = require('../../../modules/util/statusCode');
const resM = require('../../../modules/util/responseMessage');
const upload = require('../../../config/multer'); //config의 S3에 올라가는 경로

const Article = require('../../../models/blogs/article');

// 모든 Article 가져오기 localhost:3000/blogs/1/articles
router.get('/',async(req,res)=>{
    const {blogIdx} = req.params;

    try{
        const {code,json} = await Article.readAll({blogIdx});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }
});

// 특정 Article 가져오기 localhost:3000/blogs/1/articles/1
router.get('/:articleIdx',async(req,res)=>{
    const {blogIdx,articleIdx} = req.params;

    // blogIdx 값이 없으면 
    if(!blogIdx){
        res.status(stC.BAD_REQUEST).send(utils.successFalse(resM.NULL_VALUE));
        return;
    }
    try{
        const {code,json} = await Article.readSelect({blogIdx, articleIdx});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(utils.successFalse(INTERNAL_SERVER_ERROR));
    }   
});


// Article 작성하기 localhost:3000/blogs/1/articles?
router.post('/',upload.array('images',3),async(req,res)=>{
    const {title,content,writer} = req.body;
    const {blogIdx} = req.params;
    const token = req.headers.token;
    const image = { file: req.files};

    if(!title || !content || !writer ||!blogIdx ||!token){
        res.status(stC.BAD_REQUEST)
        .send(utils.successFalse(resM.NULL_VALUE));
        return;
    }
    try{
        const {code,json} = await Article.create({title,content,writer,blogIdx,token,image});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(utils.successFalse(resM.INTERNAL_SERVER_ERROR));
    }
});

// Article 수정하기 localhost:3000/blogs/1/articles/1
router.put('/:articleIdx',async (req, res) => {
    const {title, content, writer} = req.body;
    const {blogIdx, articleIdx} =req.params;
    const token = req.headers.token;

    console.log(title,content,writer,blogIdx,articleIdx,token);
    if(!blogIdx || !title || !content || !writer ||! token){
        res.status(stC.BAD_REQUEST)
        .send(utils.successFalse(resM.NULL_VALUE));
        return;
    }
   
    try{
        const {code,json} = await Article.update({blogIdx, articleIdx, title, content, writer,token});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(utils.successFalse(resM.INTERNAL_SERVER_ERROR));
    }
});

// Article 삭제하기 localhost:3000/blogs/1/articles/1
router.delete('/:articleIdx', async(req, res) => {
    const {blogIdx, articleIdx} = req.params;
    const token = req.headers.token;

    if(!blogIdx||! token){
        res.status(stC.BAD_REQUEST)
        .send(utils.successFalse(resM.NULL_VALUE));
        return;
    }
    try{
        const {code,json} = await Article.delete({blogIdx, articleIdx,token});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }
});

module.exports = router;