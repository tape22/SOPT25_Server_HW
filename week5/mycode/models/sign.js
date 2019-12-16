const stC = require('../modules/util/statusCode');
const resM = require('../modules/util/responseMessage');
const utils = require('../modules/util/utils');

//const encrypt = require('../modules/auth/encryption');
const jwt = require('../modules/auth/jwt');
const pool = require('../modules/pool');
//const jwt = require('../../modules/jwt');
const crypto = require('crypto');

const table = 'Sign';

module.exports={
    // 회원가입 
    signup: async({userId,hashPwd,email,salt})=>{
        const fields = 'userId,password,email,salt';
        const questions =  `'${userId}','${hashPwd}','${email}','${salt}'`;
        const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`; //문법오류
        const result = await pool.queryParam_None(query);
        
        // ID 중복체크
        const checkId = pool.queryParam_None(`SELECT * FROM Sign WHERE userId = '${userId}'`);
        console.log(checkId);
        if(checkId.length >0){
            return{
                code : stC.BAD_REQUEST,
                json : utils.successFalse(reM.ALREADY_ID)    
            };
        }else{
            // 회원가입
            if( result.length == 0){
                return{
                    code : stC.INTERNAL_SERVER_ERROR,
                    json : utils.successFalse(resM.INTERNAL_SERVER_ERROR)
                };
            }else{
                return{
                    code : stC.OK,
                    json : utils.successTrue(resM.SIGN_UP_SUCCESS)
                };
            }
        }

        
    },

    login : async({userId, password})=>{
        const query = `SELECT * FROM ${table} WHERE userId = '${userId}' `;
        const result = await pool.queryParam_None(query);
        
        //console.log(result);

        //userId가 DB에 없으면 에러 처리
        if(result.length == 0){
            return{
                code : stC.BAD_REQUEST,
                json : utils.successFalse(resM.NO_USER)
            };
        }

        //받은 password값이랑 DB에 있는 값이랑 비교

        const salt = JSON.stringify(result[0].salt);
        //const Id = JSON.stringify(result[0].userId);
        const hashPwd = JSON.stringify(result[0].password);
        console.log(salt,hashPwd);

        // const hashPwd_login = crypto.createHash("sha512").update(password+salt).digest("hex");
        // console.log(hashPwd_login);
        
        // if (hashPwd_login != hashPwd){
        //     return{
        //         code : stC.BAD_REQUEST,
        //         json : utils.successFalse(resM.MISS_MATCH_PW)
        //     };
        // }


        //토큰 발행(jwt)하고 성공 메시지 보내기
        return{
            code: stC.OK,
            json: utils.successTrue(resM.SIGN_IN_SUCCESS)
        }

        


    }
 };