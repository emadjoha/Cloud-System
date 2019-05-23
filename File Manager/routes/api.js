const express = require('express');
const route = express.Router();
const db = require('../module/conn')

route.get('/files/:name/:size/:uid/:isfolder/:parent', require('../controlers/choice').post);

route.get('/info/:uid',require('../controlers/choice').info);

route.get('/file/:fid',require('../controlers/choice').download);

route.get('/addFolder/:name/:uid/:parent',require('../controlers/choice').addfolder);


module.exports = route;

