const express = require('express');
const router = express.Router({mergeParams: true});

const stC = require('../../modules/util/statusCode');
const resM = require('../../modules/util/responseMessage');
const utils = require('../../modules/util/utils');
const pool = require('../../modules/pool');
const jwt = require('../../modules/auth/jwt');
const table = 'Blog';

module.exports ={
    
    // 모든 블로그 가져오기
    readAll:async()=>{
        const query = `SELECT * FROM ${table}`;
        const result = await pool.queryParam_None(query); 

        if(!result){
            return{
                code: stC.BAD_REQUEST,
                json: utils.successFalse(resM.BLOG_READ_ALL_FAIL)
            };
        }

        return{
            code: stC.OK,
            json: utils.successTrue(resM.BLOG_READ_ALL_SUCCESS,result)
        };
    },

    readSelect : async({blogIdx})=>{
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}'`);

        if(result.length ==0){
            return{
                code: stC.BAD_REQUEST,
                json: utils.successFalse(resM.BLOG_READ_FAIL)
            };
        }

        return{
            code: stC.OK,
            json: utils.successTrue(resM.BLOG_READ_SUCCESS,result)
        };

    },

    create: async({blogName,token})=>{

        //token 값 확인하고 수정하기 
        const check = jwt.verify(token);
        console.log(check);
        if(check == 'valid'){
            const fields = 'blogName';
            const result = await pool.queryParam_None(`INSERT INTO ${table}(${fields})VALUES('${blogName}')`);
            
            if(result.length ==0){
                return{
                    code: stC.BAD_REQUEST,
                    json: utils.successFalse(resM.BLOG_CREATE_FAIL)};
        }
            return{
                code: stC.OK,
                json: utils.successTrue(resM.BLOG_CREATE_SUCCESS)
            };
        }else{
            return{
                code: stC.RESET_CONTENT,
                json: utils.successFalse(resM.INVALID_TOKEN)
            }
        }
        

    },

    update: async({blogName,blogIdx,token})=>{

        const check = jwt.verify(token);
        console.log(check);
        if(check == 'valid'){
            const result = await pool.queryParam_None(`UPDATE ${table} SET blogName = '${blogName}' WHERE blogIdx = '${blogIdx}'`);

            if(result.length ==0){
                return{
                    code: stC.BAD_REQUEST,
                    json: utils.successFalse(resM.BLOG_UPDATE_FAIL)
                };
            }

            return{
                code: stC.OK,
                json: utils.successTrue(resM.BLOG_UPDATE_SUCCESS)
            };
        }else{
            return{
                code: stC.RESET_CONTENT,
                json: utils.successFalse(resM.INVALID_TOKEN)
            }
        }
        
    },

    delete: async({blogIdx,token})=>{
        const check = jwt.verify(token);
        console.log(check);
        if(check == 'valid'){
            const result = await pool.queryParam_None(`DELETE FROM ${table} WHERE blogIdx='${blogIdx}'`);

            if(result.length ==0){
                return{
                    code: stC.BAD_REQUEST,
                    json: utils.successFalse(resM.BLOG_DELETE_FAIL)
                };
            }

            return{
                code: stC.OK,
                json: utils.successTrue(resM.BLOG_DELETE_SUCCESS)
            };
        }else{
            return{
                code: stC.RESET_CONTENT,
                json: utils.successFalse(resM.INVALID_TOKEN)
            }
        }
        
    }

};







