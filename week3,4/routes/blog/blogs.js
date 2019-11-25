// CRUD는 구현함!
const express = require('express');
const router = express.Router({mergeParams: true});
const pool = require('../../module/pool');

const table = 'BLOG';
// 모듈 분리도 아직 안한 상태!

// 모든 게시글 가져오기 -> index에서 router.use를 썼어야했는데 router.get쓰고 앉아있었음.
router.get('/', async (req, res) => {
    try{
        const query = `SELECT * FROM ${table}`;
        const result = await pool.queryParam_None(query); // 얘가 []으로 읽힌다는 건데.
        res.status(200).send(result);
        
    }catch (err) {
        res.status(500).send('error');
        console.log(err);
        return;
    }
    
})


// 게시글 가져오기 -> 이하동문
router.get('/:blogIdx', async (req, res) => {
    try {
        const {blogIdx} = req.params; // /1<- 요거 받아오는건 params로!(입력값 안주고 바로 받기)
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}'`);
        res.status(200).send(result);
        console.log(result);
    } catch (err) {
        res.status(500).send('error');
        console.log(err);
        return;
    }

})
// 게시글 작성하기-> 됨!(11/12, 근데 인덱스가 5부터 시작한다-> DB 초기화하고 시작.)
router.post('/', async (req, res) => {
    try {
        const fields = 'blogName';
        const {blogName} = req.body;
        const questions = `'${blogName}'`;
        const result = await pool.queryParam_None(`INSERT INTO ${table}(${fields})VALUES(${questions})`);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('error');
        console.log(err)
        return;
    }

})


// 게시글 수정하기-> 됨!(인덱스는 그냥 5번 그대로 하면 되는듯.)
router.put('/:blogIdx', async (req, res) => {
    try {
        const {blogName} = req.body;
        const {blogIdx} = req.params;
        const result = await pool.queryParam_None(`UPDATE ${table} SET blogName = '${blogName}' WHERE blogIdx = '${blogIdx}'`);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('게시글 수정 에러');
        console.log(err);
        return;
    }

})

// 게시글 삭제하기-> 된다!(다 지워보자.)
router.delete('/:blogIdx', async (req, res) => {
    try {
        const {blogIdx} = req.params;
        const result = await pool.queryParam_None(`DELETE FROM ${table} WHERE blogIdx='${blogIdx}'`);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('게시글 삭제 에러');
        return;
    }

})



module.exports = router;