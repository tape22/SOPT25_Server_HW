const express = require('express');
const router = express.Router();
const group_path = __dirname + '/../../public/javascripts/group.csv'
const member_path = __dirname + '/../../public/javascripts/member.csv'

const csv = require('csvtojson');
var bodyParser = require('body-parser');
// 1단계!

router.get('/', function(req, res) {
    // TODO 그룹 구성원 전체 보기
    csv().fromFile(group_path).then((jsonArr) => {
        if (!jsonArr) {
            console.log(`file read err: ${err}`);
            return;
        }
        res.send(jsonArr);
        }, (err) => {
        console.log(`err with readCSV: ${err}`);
        })
});

router.get('/:groupIdx', function(req, res,body) {
    const Idx = req.params.groupIdx;
    // TODO 특정 그룹의 인원 보기
    const groups = csv().fromFile(member_path);
    csv().fromFile(member_path).then((member) => {
        if (!member) {
            console.log(`file read err: ${err}`);
            return;
        }

        const result = member.filter(mem=> mem.groupIdx == Idx);
        res.send(result);
        }, (err) => {
        console.log(`err with readCSV: ${err}`);
        })
});




module.exports = router;