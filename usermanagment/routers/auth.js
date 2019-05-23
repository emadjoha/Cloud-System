const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _=require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middelware/auth');



router.post('/',async (req,res)=>{
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('invalid email/password');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
 
    if(!validPassword) return res.status(400).send('invalid email/password');

    const token = user.generateToken();

    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']))

});


router.get('/token',(req,res)=>{
    var v = jwt.verify(req.header('x-auth-token'),'jwtPrivate');
    res.send({statue:v});
});


function validate(user){
    const schema={
        email:Joi.string().min(5).max(255).required(),
        password:Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(user,schema)
}

module.exports = router;