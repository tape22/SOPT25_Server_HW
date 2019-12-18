const express = require('express');
const router = express.Router({mergeParams: true});
const utils = require('../../modules/util/utils');
const resM = require('../../modules/util/responseMessage');
const stC = require('../../modules/util/statusCode');
const Blog = require('../../models/blogs/blog');


// 모든 블로그 가져오기 localhost:3000/blogs
router.get('/', async (req, res) => {
    try{
        const {code,json} = await Blog.readAll();
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }
    
})


// 블로그 가져오기 localhost:3000/blogs/1
router.get('/:blogIdx', async (req, res) => {
    const {blogIdx} = req.params; 
    // blogIdx 값이 없으면 
    if(!blogIdx){
        res.status(stC.BAD_REQUEST).send(utils.successFalse(resM.NULL_VALUE));
        return;
    }
    
    try{
        const {code,json} = await Blog.readSelect({blogIdx});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }

})

// 블로그 만들기 (post)localhost:3000/blogs
router.post('/', async (req, res) => {
    const {blogName} = req.body;
    const token = req.headers.token;

    if(!blogName ||!token){
        res.status(stC.BAD_REQUEST)
        .send(utils.successFalse(resM.NULL_VALUE));
        return;
    }
    
    try{  
        const {code,json} = await Blog.create({blogName,token});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }

})


// 블로그 이름 수정하기 localhost:3000/blogs/1
router.put('/:blogIdx', async (req, res) => {
    const {blogName} = req.body;
    const token = req.headers.token;
    const {blogIdx} = req.params;

    if(!blogName ||!blogIdx ||!token){
        res.status(stC.BAD_REQUEST)
        .send(utils.successFalse(resM.NULL_VALUE));
        return;
    }
    try{
        const {code,json} = await Blog.update({blogName,token,blogIdx});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }

})

// 블로그 삭제하기 localhost:3000/blogs/1 
router.delete('/:blogIdx', async (req, res) => {
    const token = req.headers.token;
    const {blogIdx} = req.params;

    if(!blogIdx ||!token){
        res.status(stC.BAD_REQUEST)
        .send(utils.successFalse(resM.NULL_VALUE));
        return;
    }
    try{ 
        const {code,json} = await Blog.delete({blogIdx,token});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }

})



module.exports = router;