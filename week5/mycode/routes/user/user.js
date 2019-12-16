var express = require('express');
var router = express.Router();

const utils = require('../../modules/util/utils');
const stC = require('../../modules/util/statusCode');
const resM = require('../../modules/util/responseMessage');

const Sign = require('../../models/sign');
//const jwt = require('../../modules/jwt');
const crypto = require('crypto');

router.post('/signup',async(req,res)=>{
    const {userId, password, email} = req.body;
    //console.log(req.body);
    
    //pwd salt값 뿌려주기
    let pwd = password;
    let salt = Math.round((new Date().valueOf()*Math.random())+"");
    let hashPwd = crypto.createHash("sha512").update(pwd+salt).digest("hex");
    //console.log(hashPwd);
    
    //공백 값 체크
    if(!userId || !password || !email){
        res.status(stC.BAD_REQUEST).send(utils.successFalse(resM.NULL_VALUE));
        return;
    }

    //회원가입
    try{
        const {code,json}= await Sign.signup({userId,hashPwd,email,salt});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }
   

});


router.post('/login',async(req,res)=>{
    const {userId,password} = req.body;

    if (!userId || !password){
        res.status(stC.BAD_REQUEST).send(utils.successFalse(resM.NULL_VALUE));
        return;
    }

    try{
        const {code,json} = await Sign.login({userId,password});
        res.status(code).send(json);

    }catch(err){
        console.log(err);
        res.status(stC.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR);
    }
})

module.exports = router;