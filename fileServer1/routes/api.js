const express =require('express');
const router = express.Router(); 
const getSize = require('../helpjs/filemanage');
const path = require('path');
const fs = require('fs');
const controlFile = require('../controlers/size');


router.get('/size',controlFile.get);
router.get('/file/:id',controlFile.fileid);
router.get('/url/:id',controlFile.fileurl);
router.post('/s1/:id', controlFile.postFile);



function middeware(req,res,next){

    const options = {
        method: "POST",
        url: "http://localhost:8090/api/s1/"+id,
        port: 443,
        headers: {
            "Content-Type": "multipart/form-data",
            "auth-x-token":req.header('auth-x-token')
        },

    };
     request(options, function (err, res, body) {

        if(!res.body.get('v')) {
            console.log(err.message);
        }else{
            next();
        }
    });
}

module.exports = router;