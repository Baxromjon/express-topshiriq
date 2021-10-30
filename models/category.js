const Joi=require('joi');
const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    }
});

const Category=mongoose.model('Category', categorySchema);

function validateCategory(category){
    const categorySchema={
        name:Joi.string().required().min(3)
    }
    return Joi.validate(category, categorySchema);
    }

    exports.Category=Category;
    exports.categorySchema=categorySchema;
    exports.validate=validateCategory;