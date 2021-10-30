const express=require('express');
const router=express.Router();
const {Course, validate}=require('../models/courses');
const mongoose=require('mongoose');
const {Category}=require('../models/category');
const auth=require('../middleware/auth')

//GET METHODI
router.get('/', async (req, res)=>{
    const Course=await Course.find().sort('title');
    res.send(Course);
});

//GETBYID METHODI
router.get('/:id', async(req, res)=>{
    const course=await Course.findById(req.params.id);
    if(!course){
        res.send('Bunday IDga ega course topilmadi!')
    }
    res.send(course);
})

//POST METHODI
router.post('/',auth, async(req, res)=>{
    const {error}=validate(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    let category=await Category.findById(req.body.categoryId);
    if(!category)
        return res.status(400).send('Berilgan IDga ega category topilmadi!')

    let course=new Course({
        title:req.body.title,
        status:req.body.status,
        category:{
            _id:category._id,
            name:category.name
        },
        trainer:req.body.trainer,
        tags:req.body.tags,
        fee:req.body.fee
    })
    course=await course.save();
    res.status(201).send(course);
})

//PUT METHODI
router.put('/:id',auth, async(req, res)=>{
    const {error}=validate(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);
    
    let category= await Category.findById(req.body.categoryId);
    if(!category)
    return res.status(404).send('Bunday IDga ega category topilmadi!');

    const course=await Course.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        category:{
            _id:category._id,
            name:category.name
        },
        trainer:req.body.trainer,
        tags:req.body.tags,
        status:req.body.status,
        fee:req.body.fee
    }, {new:true});

    if(!course)
    return res.status(400).send('Bunday IDga ega course topilmadi!')

    res.send(course);
})

//DELETE METHODI
router.delete('/:id', auth, async(req, res)=>{
    const course=await Course.findByIdAndRemove(req.params.id);
    if(!course)
    return res.status(400).send('Bunday IDga ega course topilmadi!')
    res.send(course);

})


module.exports=router;
