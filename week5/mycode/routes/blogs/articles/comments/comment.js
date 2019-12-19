const express = require('express');
const router = express.Router({mergeParams: true});

const utils = require('../../../../modules/util/utils');
const stC = require('../../../../modules/util/statusCode');
const resM = require('../../../../modules/util/responseMessage');

const Comment = require('../../../../models/blogs/comment');

// 모든 Comment 가져오기 localhost:3000/blogs/1/articles/1/comments
router.get('/',async(req,res)=>{
    const {blogIdx,articleIdx} = req.params;
    
    if(!blogIdx ||!articleIdx){
        res.status(stC.BAD_REQUEST)
        .send(utils.successFalse(resM.NULL_VALUE));
        return;
    }

    try{
        const {code,json} = await Comment.readAll({blogIdx,articleIdx});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(utils.successFalse(resM.INTERNAL_SERVER_ERROR));
    }
});

// 특정 Comment 가져오기 localhost:3000/blogs/1/articles/1/comments/1
router.get('/:commentIdx',async(req,res)=>{
    const {blogIdx,articleIdx,commentIdx} = req.params;

    // blogIdx 값이 없으면 
    if(!blogIdx || !articleIdx){
        res.status(stC.BAD_REQUEST).send(utils.successFalse(resM.NULL_VALUE));
        return;
    }
    try{
        const {code,json} = await Comment.readSelect({blogIdx, articleIdx, commentIdx});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(utils.successFalse(resM.INTERNAL_SERVER_ERROR));
    }   
});

 
// Comment 작성하기 localhost:3000/blogs/1/articles/1/comments
router.post('/',async(req,res)=>{
    const {comment} = req.body;
    const {blogIdx,articleIdx} = req.params;
    const token = req.headers.token;

    if(!comment || !articleIdx || !blogIdx ||!token){
        res.status(stC.BAD_REQUEST)
        .send(utils.successFalse(resM.NULL_VALUE));
        return;
    }
    try{
        const {code,json} = await Comment.create({comment,blogIdx,articleIdx,token});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(utils.successFalse(resM.INTERNAL_SERVER_ERROR));
    }
});

// Comment 수정하기 localhost:3000/blogs/1/articles/1/comments/1
router.put('/:commentIdx',async (req, res) => {
    const {comment} = req.body;
    const {blogIdx, articleIdx, commentIdx} =req.params;
    const token = req.headers.token;

    if(!blogIdx || !commentIdx || !comment||!articleIdx ||!token){
        res.status(stC.BAD_REQUEST).send(utils.successFalse(resM.NULL_VALUE));
        return;
    }
    
   
    try{
        const {code,json} = await Comment.update({blogIdx, articleIdx, commentIdx, comment,token});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(utils.successFalse(resM.INTERNAL_SERVER_ERROR));
    }
});

// Comment 삭제하기 localhost:3000/blogs/1/articles/1/comments/1
router.delete('/:commentIdx', async(req, res) => {
    const {blogIdx, articleIdx,commentIdx} = req.params;
    const token = req.headers.token;

    if(!blogIdx || !articleIdx ||!commentIdx || !token){
        res.status(stC.BAD_REQUEST)
        .send(utils.successFalse(resM.NULL_VALUE));
        return;
    }
    try{
        const {code,json} = await Comment.delete({blogIdx, articleIdx,commentIdx,token});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(utils.successFalse(resM.INTERNAL_SERVER_ERROR));
    }
});

module.exports = router;