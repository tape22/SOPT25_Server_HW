const util = require('../module/util/utils');
const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const pool = require('../module/pool');

const table = 'COMMENT';

comment ={
    // 댓글 만들기 => ok
    create: ({blogIdx,articleIdx,comment})=>{
        const fields ='blogIdx,articleIdx,comment';
        const questions = `'${blogIdx}','${articleIdx}','${comment}'`;
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

    // 댓글 다 읽어오기 => Ok
    readAll: ({blogIdx,articleIdx})=>{
        const query = `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}' AND articleIdx = ${articleIdx}`;
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

    // 댓글 일부 읽어오기
    readSelect: ({blogIdx,articleIdx,commentIdx})=>{
        const query = `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}' AND articleIdx ='${articleIdx}' AND commentIdx = '${commentIdx}'`;
        
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

    // 댓글 수정하기
    update: ({blogIdx,articleIdx,commentIdx,comment})=>{
        const query = `UPDATE ${table} SET comment = '${comment}' WHERE blogIdx = '${blogIdx}' AND articleIdx = '${articleIdx}' AND commentIdx =${commentIdx}`;
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
    delete: ({blogIdx,articleIdx,commentIdx})=>{
        const query = `DELETE FROM ${table} WHERE blogIdx = '${blogIdx}' AND articleIdx = '${articleIdx}' AND commentIdx ='${commentIdx}'`;
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

module.exports = comment;