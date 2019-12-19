const utils = require('../../modules/util/utils');
const stC = require('../../modules/util/statusCode');
const resM = require('../../modules/util/responseMessage');
const pool = require('../../modules/pool');
const jwt = require('../../modules/auth/jwt');

const table = 'Comment';

comment ={
    // 댓글 다 읽어오기
    readAll: async({blogIdx,articleIdx})=>{
        const query = `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}' AND articleIdx = ${articleIdx}`;
        const result = await pool.queryParam_None(query);
        //const blog = result[0];
        
        if(result.length ==0){
            return {
                code: stC.BAD_REQUEST,
                json: utils.successFalse(resM.BLOG_READ_FAIL)
            };
        }
        return {
            code: stC.OK,
            json: utils.successTrue(resM.BLOG_READ_SUCCESS, result)
            }
        
    },

    // 댓글 일부 읽어오기
    readSelect: async({blogIdx,articleIdx,commentIdx})=>{
        const query = `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}' AND articleIdx ='${articleIdx}' AND commentIdx = '${commentIdx}'`;
        const result = await pool.queryParam_None(query);
        //const blog = result[0];
        if(result.length ==0){
            return {
                code: stC.BAD_REQUEST,
                json: utils.successFalse(resM.BLOG_READ_FAIL)
            };
        }
        return {
            code: stC.OK,
            json: utils.successTrue(resM.BLOG_READ_SUCCESS, result)
        }
        
    },

    // 댓글 만들기 => ok
    create: async({blogIdx,articleIdx,comment,token})=>{
        const check = jwt.verify(token);
        
        if(check == 'valid'){
            const fields ='blogIdx,articleIdx,\comment';
            const questions = `'${blogIdx}','${articleIdx}','${comment}'`;
            const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
            
            const result = await pool.queryParam_None(query);
            if (result.length == 0){
                return{
                    code: stC.BAD_REQUEST,
                    json: utils.successFalse(resM.BLOG_CREATE_FAIL)
                };
            }
            return {
                code: stC.OK,
                json: utils.successTrue(resM.BLOG_CREATE_SUCCESS,result)};
        }else{
            return{
                code:stC.BAD_REQUEST,
                json:utils.successFalse(resM.INVALID_TOKEN)
            };
        }
        
    },
    // 댓글 수정하기
    update: async({blogIdx,articleIdx,commentIdx,comment,token})=>{
        const check = jwt.verify(token);

        if(check == 'valid'){
            const query = `UPDATE ${table} SET comment = '${comment}' WHERE blogIdx = '${blogIdx}' AND articleIdx = '${articleIdx}' AND commentIdx =${commentIdx}`;
            const result = await pool.queryParam_None(query);
            
            if(result.length ==0){
                return{
                    code: stC.BAD_REQUEST,
                    json: utils.successFalse(resM.BLOG_UPDATE_FAIL)
                    };
                }
            return {
                code: stC.OK,
                json: utils.successTrue(resM.BLOG_UPDATE_SUCCESS)
                };
        }else{
            return{
                code:stC.BAD_REQUEST,
                json:utils.successFalse(resM.INVALID_TOKEN)
            };
        }
        
    },

    // article 삭제하기 
    delete: async ({blogIdx,articleIdx,commentIdx,token})=>{
        const check = jwt.verify(token);
        if(check == 'valid'){
            const query = `DELETE FROM ${table} WHERE blogIdx = '${blogIdx}' AND articleIdx = '${articleIdx}' AND commentIdx ='${commentIdx}'`;
            const result = await pool.queryParam_None(query);
            
            if(result.length ==0){
                return{
                    code: stC.BAD_REQUEST,
                    json: utils.successFalse(resM.BLOG_DELETE_FAIL)
                    };
                }
            return {
                code: stC.OK,
                json: utils.successTrue(resM.BLOG_DELETE_SUCCESS)
                };
        }else{
            return{
                code:stC.BAD_REQUEST,
                json:utils.successFalse(resM.INVALID_TOKEN)
            };
        }
        
    }

}

module.exports = comment;