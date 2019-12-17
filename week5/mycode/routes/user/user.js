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

    //공백 값 체크
    if(!userId || !password || !email){
        res.status(stC.BAD_REQUEST).send(utils.successFalse(resM.NULL_VALUE));
        return;
    }

    //회원가입
    try{
        //pwd salt값 뿌려주기
        const salt = crypto.randomBytes(32).toString('base64');
        console.log(salt);
        const derivedKey = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512');
        const key =  derivedKey.toString('base64');
        console.log(key)
        
        const {code,json}= await Sign.signup({userId,key,email,salt});
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