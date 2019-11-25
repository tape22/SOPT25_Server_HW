const express = require('express');
const router = express.Router({mergeParams: true});

const authU = require('../../../module/util/authUtils');
const stC = require('../../../module/util/statusCode');
const resM = require('../../../module/util/responseMessage');
const Article = require('../../../models/article');


// readAll
router.get('/',(req,res)=>{
    const {blogIdx} = req.params;

    Article.readAll({blogIdx})
    .then(({code,json})=>{
        res.status(code).send(json);
    }).catch(err=>{
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(authU.successFalse(resM.INTERNAL_SERVER_ERROR));
    });
});

// readSelect => OK!
router.get('/:articleIdx',(req,res)=>{
    const {blogIdx,articleIdx} = req.params;

    // blogIdx 값이 없으면 
    if(!blogIdx){
        res.status(stC.BAD_REQUEST)
        .send(authU.successFalse(resM.NULL_VALUE));
        return;
    }
    // 제대로 읽어왔으면
    Article.readSelect({blogIdx,articleIdx})
    .then(({code,json})=>{
        res.status(code).send(json);
    }).catch(err=>{
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(authU.successFalse(resM.INTERNAL_SERVER_ERROR));
    });
});

// create => OK! 잘 집어넣어지는데 articleIdx가 blogIdx상관없이 1,2,3,4로 늘어나는게 맞겠지?
router.post('/',(req,res)=>{
    const {title,content,writer} = req.body;
    const {blogIdx} = req.params;

    if(!title || !content || !writer ||!blogIdx){
        res.status(stC.BAD_REQUEST)
        .send(authU.successFalse(resM.NULL_VALUE));
        return;
    }
    Article.create({title,content,writer,blogIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(authU.successFalse(resM.INTERNAL_SERVER_ERROR));
    });
});

// update => OK! 
router.put('/:articleIdx', (req, res) => {
    const {title, content, writer} = req.body;
    const {blogIdx, articleIdx} =req.params;

    if(!blogIdx || !title || !content || !writer){
        res.status(stC.BAD_REQUEST)
        .send(authU.successFalse(resM.NULL_VALUE));
        return;
    }
    
    Article.update({blogIdx, articleIdx, title, content, writer})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(authU.successFalse(resM.INTERNAL_SERVER_ERROR));
    });
});

// delete => OK!
router.delete('/:articleIdx', (req, res) => {
    const {blogIdx, articleIdx} = req.params;

    if(!blogIdx){
        res.status(stC.BAD_REQUEST)
        .send(authU.successFalse(resM.NULL_VALUE));
        return;
    }
    Article.delete({blogIdx, articleIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(authU.successFalse(resM.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;