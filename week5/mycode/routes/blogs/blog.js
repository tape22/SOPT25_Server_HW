const express = require('express');
const router = express.Router({mergeParams: true});

const stC = require('../../modules/util/statusCode');
const resM = require('../../modules/util/responseMessage');
const utils = require('../../modules/util/utils');
const pool = require('../../modules/pool');
const Blog = require('../../models/blogs/blog');

const table = 'Blog';


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
    try{
        const {blogIdx} = req.params; 
        const {code,json} = await Blog.read({blogIdx});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }

})

// 블로그 만들기 (post)localhost:3000/blogs
router.post('/', async (req, res) => {
    try{
        const {blogName,token} = req.body;
        const {code,json} = await Blog.create({blogName,token});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }

})


// 블로그 이름 수정하기 localhost:3000/blogs/1
router.put('/:blogIdx', async (req, res) => {
        
    try{
        const {blogName,token} = req.body;
        const {blogIdx} = req.params;
        const {code,json} = await Blog.update({blogName,token,blogIdx});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }

})

// 블로그 삭제하기 localhost:3000/blogs/1 
router.delete('/:blogIdx', async (req, res) => {
    try{
        const {token} = req.body;
        const {blogIdx} = req.params;
        const {code,json} = await Blog.delete({blogIdx,token});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }

})



module.exports = router;