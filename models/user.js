const Joi=require('joi');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const config=require('config')



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:1024
    },
    isAdmin:Boolean
});

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this.id, isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}

const User=mongoose.model('User', userSchema);

function userValidation(user) {
    const userSchema={
        name:Joi.string().required().min(3),
        email:Joi.string().required().min(5).max(255).email(),
        password:Joi.string().required().min(6).max(15),
        isAdmin:Joi.boolean().required()
    }
    return Joi.validate(user, userSchema);
};

exports.User=User;
exports.userValidation=userValidation;