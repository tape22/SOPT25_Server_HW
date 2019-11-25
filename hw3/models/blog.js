const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const pool = require('../module/poolSync');

const table = 'BLOG';

module.exports ={
    create: async ({blogName})=>{
        const fields = 'blogName';
        const questions = `'${blogName}'`;
        const result = await pool.queryParam_None(`INSERT INTO ${table}(${fields})VALUES(${questions})`);

        if (!result){
            return {
                code: statusCode.BAD_REQUEST,
                json: authUtil.successFalse(responseMessage.BOARD_CREATE_FAIL)
            };
        }
        return {
            code: statusCode.OK,
            json: authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS)
        };

    },

    readALL : async ()=>{
        const result = await pool.queryParam_None(`SELECT * FROM ${table}`);

        if (!result){
            return {
                code: statusCode.BAD_REQUEST,
                json: authUtil.successFalse(responseMessage.NO_BOARD)
            };
        }
        return {
            code: statusCode.OK,
            json: authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS,result)
        };

    },

    read : async(blogIdx)=>{
        //const {blogIdx} = req.params; // /1<- 요거 받아오는건 params로!(입력값 안주고 바로 받기)
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}'`);

        if (!result){
            return {
                code: statusCode.BAD_REQUEST,
                json: authUtil.successFalse(responseMessage.NO_BOARD)
            };
        }
        return {
            code: statusCode.OK,
            json: authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS,result)
        };
    },

    update : async(blogIdx,blogName)=>{
        const result = await pool.queryParam_None(`UPDATE ${table} SET blogName = '${blogName}' WHERE blogIdx = '${blogIdx}'`);
        
        if (!result){
            return {
                code: statusCode.BAD_REQUEST,
                json: authUtil.successFalse(responseMessage.BOARD_UPDATE_FAIL)
            };
        }
        return {
            code: statusCode.OK,
            json: authUtil.successTrue(responseMessage.BOARD_UPDATE_SUCCESS)
        };
    },

    delete : async(blogIdx)=>{
        const result = await pool.queryParam_None(`DELETE FROM ${table} WHERE blogIdx='${blogIdx}'`);

        if (!result){
            return {
                code: statusCode.BAD_REQUEST,
                json: authUtil.successFalse(responseMessage.BOARD_DELETE_FAIL)
            };
        }
        return {
            code: statusCode.OK,
            json: authUtil.successTrue(responseMessage.BOARD_DELETE_SUCCESS)
        };
    }


    
}