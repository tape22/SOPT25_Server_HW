const utils = require('../../modules/util/utils');
const stC = require('../../modules/util/statusCode');
const resM = require('../../modules/util/responseMessage');
const pool = require('../../modules/pool');
const jwt = require('../../modules/auth/jwt');
//const {LoggedIn} = require('../../modules/util/authUtils');

const table = 'Article';
// async로 바꿔놓기만 함, token아직 다 안붙임

article ={    
    // blogIdx에 맞는 article 
    readAll: async({blogIdx})=>{
        const query = `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}'`;
        const result = await pool.queryParam_None(query);
        
        if (result.length==0){
            return{
                    code: stC.BAD_REQUEST,
                    json: utils.successFalse(resM.BLOG_READ_ALL_FAIL)
                };
            }
        return {
            code: stC.OK,
            json: utils.successTrue(resM.BLOG_READ_ALL_SUCCESS, result)
            };
    },

    // article 일부 읽어오기
    readSelect: async({blogIdx,articleIdx})=>{
        const query = `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}' AND articleIdx ='${articleIdx}'`;
        const result= await pool.queryParam_None(query); 
    
        if(result.length ==0){
            return {
                code: stC.BAD_REQUEST,
                json: utils.successFalse(resM.BLOG_READ_FAIL)
            };
        }
        return {
            code: stC.OK,
            json: utils.successTrue(resM.BLOG_READ_SUCCESS, result)
            };
    },

    // article 생성하기
    create: async({title,content,writer,blogIdx,token,image})=>{
        const check = jwt.verify(token); //token 확인

        if (check === 'valid') {
            const imageArray = [];
            for (var i in image.file){
                imageArray.push(JSON.stringify(image.file[i].location));
            }
            console.log(imageArray);
            const fields ='title,content,writer,blogIdx,image';
            const questions = `'${title}','${content}','${writer}','${blogIdx}','${imageArray}'`;
            const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
            const result = await pool.queryParam_None(query);
        
            if (result.length == 0){
                return{
                    code: stC.BAD_REQUEST,
                    json: utils.successFalse(resM.BLOG_CREATE_FAIL)
                };
            }
            return{
                code: stC.OK,
                json: utils.successTrue(resM.BLOG_CREATE_SUCCESS,result)
            };
        }else{
            return{
                code:stC.BAD_REQUEST,  // 아 씨 이거 모델로 빼고싶다 ->일단은 이미지부터 구현하기
                json:utils.successFalse(resM.INVALID_TOKEN)
            }
        }
    },
        
    
    // article 수정하기
    update: async({blogIdx,articleIdx,title,content,writer,token})=>{
        const check = jwt.verify(token);
        
        if (check == 'valid'){
            const query = `UPDATE ${table} SET title = '${title}', content = '${content}'  WHERE blogIdx = '${blogIdx}' AND articleIdx = '${articleIdx}'AND writer ='${writer}'`;
        const result = pool.queryParam_None(query);

        if(result.length === 0 ){
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
                code:stC.BAD_REQUEST,  // 아 씨 이거 모델로 빼고싶다 ->일단은 이미지부터 구현하기
                json:utils.successFalse(resM.INVALID_TOKEN)
            }
        }
        
    },


    // article 삭제하기 
    delete: ({blogIdx,articleIdx,token})=>{
        const check = jwt.verify(token);
        
        if (check == 'valid'){
            const query = `DELETE FROM ${table} WHERE blogIdx = '${blogIdx}' AND articleIdx = '${articleIdx}'`;
            const result =  pool.queryParam_None(query);
        
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
                code:stC.BAD_REQUEST,  // 아 씨 이거 모델로 빼고싶다 ->일단은 이미지부터 구현하기
                json:utils.successFalse(resM.INVALID_TOKEN)
            }
        }
        
    }
}


module.exports = article;