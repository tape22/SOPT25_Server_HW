var express = require('express');
var router = express.Router();

const util = require('../module/util/utils');
const statusCode = require('../module/util/statusCode');
const resMessage = require('../module/util/responseMessage');
const {LoggedIn} = require('../module/util/authUtils');

const jwt = require("../module/jwt");

router.post('/publish', (req, res) => {
    const {idx,grade,name} = req.body;

    if (!idx || !grade || !name) {
        res.send(`wrong parameter`);
        return;
    }
    const result = jwt.sign({idx,grade,name});
    res.json(result);
});  

router.post('/verify', (req, res) => { //변형 여부 확인하는 2번째 단계
    const {
        token
    } = req.headers;

    const result = jwt.verify(token);

    if (result == -1) {
        return res.status(statusCode.UNAUTHORIZED)
            .send(util.successFalse(resMessage.EXPIRED_TOKEN));
    }
    if (result == -2) {
        return res.status(statusCode.UNAUTHORIZED)
            .send(util.successFalse(resMessage.INVALID_TOKEN));
    }
    res.json(result);
});


router.post('/middleware', LoggedIn,(req,res)=>{  //
    console.log(req.decoded);
    res.json(req.decoded);
});


module.exports = router;