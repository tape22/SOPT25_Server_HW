const util = require('../module/util/utils');
const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const pool = require('../module/pool');

const table = 'ARTICLE';

article ={
    // article 생성하기
    create: ({title,content,writer,blogIdx})=>{
        const fields ='title,content,writer,blogIdx';
        const questions = `'${title}','${content}','${writer}','${blogIdx}'`;
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        
        return pool.queryParam_None(query)
        .then(result =>{
            if (!result){
                return{
                    code: statusCode.BAD_REQUEST,
                    json: util.successFalse(responseMessage.BOARD_CREATE_FAIL)
                }
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(responseMessage.BOARD_CREATE_SUCCESS,result)
            }
        })
        .catch(err => {
            console.log(err);
            throw err;
        })     
    },

    // blogIdx에 맞는 article 
    readAll: ({blogIdx})=>{
        const query = `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}'`;
        return pool.queryParam_None(query)
        .then(result => {
            if (!result){
                return{
                    code: statusCode.BAD_REQUEST,
                    json: util.successFalse(responseMessage.BOARD_READ_ALL_FAIL)
                }
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(responseMessage.BOARD_READ_ALL_SUCCESS, result)
            }
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
    },

    // article 일부 읽어오기
    readSelect: ({blogIdx,articleIdx})=>{
        const query = `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}' AND articleIdx ='${articleIdx}'`;
        
        return pool.queryParam_None(query)
        .then(result => {
            const blog = result[0];
            if(!blog){
                return {
                    code: statusCode.BAD_REQUEST,
                    json: util.successFalse(responseMessage.BOARD_READ_FAIL)
                };
            }
            return {
                code: statusCode.OK,
                json: util.successTrue(responseMessage.BOARD_READ_SUCCESS, result)
            }
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
    },

    // article 수정하기
    update: ({blogIdx,articleIdx,title,content,writer})=>{
        const query = `UPDATE ${table} SET title = '${title}', content = '${content}'  WHERE blogIdx = '${blogIdx}' AND articleIdx = '${articleIdx}'AND writer ='${writer}'`;
        return pool.queryParam_None(query)
            .then(result => {
                if(!result){
                    return{
                        code: statusCode.BAD_REQUEST,
                        json: util.successFalse(responseMessage.BOARD_UPDATE_FAIL)
                    }
                }
                console.log(result);
                return {
                    code: statusCode.OK,
                    json: util.successTrue(responseMessage.BOARD_UPDATE_SUCCESS)
                };
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },

    // article 삭제하기 
    delete: ({blogIdx,articleIdx})=>{
        const query = `DELETE FROM ${table} WHERE blogIdx = '${blogIdx}' AND articleIdx = '${articleIdx}'`;
        return pool.queryParam_None(query)
            .then(result => {
                console.log(result);
                if(!result){
                    return{
                        code: statusCode.BAD_REQUEST,
                        json: util.successFalse(responseMessage.BOARD_DELETE_FAIL)
                    }
                }
                return {
                    code: statusCode.OK,
                    json: util.successTrue(responseMessage.BOARD_DELETE_SUCCESS)
                };
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

}

module.exports = article;