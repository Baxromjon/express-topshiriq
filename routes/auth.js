const express=require('express');
const router=express.Router();
const {User}=require('../models/user');
const _=require('lodash')
const bcrypt =require('bcrypt');
const Joi=require('joi');


router.post('/', async(req, res)=>{
    const {error}=validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message)

        let user =await User.findOne({email:req.body.email});
        if(!user)
        return res.status(400).send('Email yoki parol xato1')

        const isValidPassword= await bcrypt.compare(req.body.password, user.password);
        if(!isValidPassword)
        return res.status(400).send('Email yoki parol xato2')

        const token=user.generateAuthToken();
        res.header('x-auth-token', token).send(true);
});

function validate(req) {
    const userSchema={
        email:Joi.string().required().min(5).max(255).email(),
        password:Joi.string().required().min(6).max(15)
    }
    return Joi.validate(req, userSchema);
};

module.exports=router;