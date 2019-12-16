// authUtil.js

const jwt = require('../auth/jwt');
const resMessage = require('./responseMessage');
const statusCode = require('./statusCode');
const util = require('./utils');

const authUtil = {
    LoggedIn : async(req,res,next)=>{
        const token = req.headers.token; // token 읽어오기

        // 1. token 존재하는 지 확인
        if (!token){
            return res.status(statusCode.BAD_REQUEST).json(util.successFalse(resMessage.EMPTY_TOKEN));
        }
        const result = jwt.verify(token);

        if (result == -1) {
            return res.status(statusCode.UNAUTHORIZED)
                .send(util.successFalse(resMessage.EXPIRED_TOKEN));
        }
        if (result == -2) {
            return res.status(statusCode.UNAUTHORIZED)
                .send(util.successFalse(resMessage.INVALID_TOKEN));
        }

        // 2. token 유효한 지 확인
        const userIdx = result.idx;
        if(!userIdx){
            res.status(statusCode.BAD_REQUEST)
            .send(util.successFalse(resMessage.NULL_VALUE));
            return;
        }
        //3. payload에 userIdx가 있는지?
        req.decoded = userIdx;
        next();
    },
};



module.exports = authUtil;

// json 형태로 보낼 때 메시지랑 데이터를 묶어서 보내기