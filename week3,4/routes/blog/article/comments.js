const express = require('express');
const router = express.Router({mergeParams: true});

const authU = require('../../../module/util/authUtils');
const stC = require('../../../module/util/statusCode');
const resM = require('../../../module/util/responseMessage');
const Comment = require('../../../models/comment');


// readAll => ok! (localhost:3000/blogs/1/articles/4/comments/)
router.get('/',(req,res)=>{
    const {blogIdx,articleIdx} = req.params;
    if(!blogIdx){
        res.status(stC.BAD_REQUEST)
        .send(authU.successFalse(resM.NULL_VALUE));
        return;
    }
    
    Comment.readAll({blogIdx,articleIdx})
    .then(({code,json})=>{
        res.status(code).send(json);
    }).catch(err=>{
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(authU.successFalse(resM.INTERNAL_SERVER_ERROR));
    });
});

// readSelect => Ok! (localhost:3000/blogs/1/articles/4/comments/1)
router.get('/:commentIdx',(req,res)=>{
    const {blogIdx,articleIdx,commentIdx} = req.params;

    // blogIdx 값이 없으면 
    if(!blogIdx){
        res.status(stC.BAD_REQUEST)
        .send(authU.successFalse(resM.NULL_VALUE));
        return;
    }
    // 제대로 읽어왔으면
    Comment.readSelect({blogIdx,articleIdx,commentIdx})
    .then(({code,json})=>{
        res.status(code).send(json);
    }).catch(err=>{
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(authU.successFalse(resM.INTERNAL_SERVER_ERROR));
    });
});

// create => ok!
router.post('/',(req,res)=>{
    const {comment} = req.body;
    const {blogIdx,articleIdx} = req.params;

    if(!comment || !articleIdx || !blogIdx){
        res.status(stC.BAD_REQUEST)
        .send(authU.successFalse(resM.NULL_VALUE));
        return;
    }
    Comment.create({comment,blogIdx,articleIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(authU.successFalse(resM.INTERNAL_SERVER_ERROR));
    });
});

// update => ok!
router.put('/:commentIdx', (req, res) => {
    const {comment} = req.body;
    const {blogIdx, articleIdx,commentIdx} =req.params;

    if(!blogIdx || !commentIdx || !comment||!articleIdx){
        res.status(stC.BAD_REQUEST)
        .send(authU.successFalse(resM.NULL_VALUE));
        return;
    }
    
    Comment.update({blogIdx, articleIdx, commentIdx, comment})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(authU.successFalse(resM.INTERNAL_SERVER_ERROR));
    });
});

// delete => ok!
router.delete('/:commentIdx', (req, res) => {
    const {blogIdx, articleIdx,commentIdx} = req.params;

    if(!blogIdx){
        res.status(stC.BAD_REQUEST)
        .send(authU.successFalse(resM.NULL_VALUE));
        return;
    }
    Comment.delete({blogIdx, articleIdx, commentIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(authU.successFalse(resM.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;