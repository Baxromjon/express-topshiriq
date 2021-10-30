const Joi=require('joi');
const mongoose=require('mongoose');

const customersSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    isVip:{type:Boolean,default:false},
    phone:{type:String, required:true, length:12},
    bonusPoints:Number
});

const Customers=mongoose.model('Customer', customersSchema);

function validateCustomer(customer){
    const customersSchema={
        name:Joi.string().required().min(3),
        isVip:Joi.boolean(),
        phone:Joi.string().required().length(12),
        bonusPoints: Joi.number().min(0)
    }
    return Joi.validate(customer, customersSchema);
    }

    exports.Customers=Customers;
    exports.validate=validateCustomer;