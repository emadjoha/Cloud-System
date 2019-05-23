const express =require('express');
const router = express.Router(); 
const getSize = require('../helpjs/filemanage');
const path = require('path');
const fs = require('fs');
const controlFile = require('../controlers/size');


router.get('/size', controlFile.get);
router.get('/file/:id',controlFile.fileid);
router.get('/url/:id',controlFile.fileurl);
router.post('/s3/:id', controlFile.postFile);

module.exports = router;