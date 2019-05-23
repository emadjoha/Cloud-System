const {User,validate} = require('../models/user');
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();
const _=require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middelware/auth');
const admin =require('../middelware/admin');

router.get('/me',[auth,admin],async (req,res)=>{
    console.log("me :)");
    console.log(req);
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});



router.post('/',async (req,res)=>{

    //Before save  user in DB
    /*
    * check if user exist
    * email?
    * **/
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email:req.body.email});
   
    if(user) return res.status(400).send('user already Register');
    /**
     *     user= new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            isAdmin:req.body.isAdmin
        });
     */
    
    user= new User(_.pick(req.body,['name','email','password','isAdmin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);

    await user.save();
    const token = user.generateToken();
    res.header('x-auth-token',token).send({
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    });
});


module.exports = router;