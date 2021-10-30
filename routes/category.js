const express=require('express');
const router=express.Router();
const {Category, validate}=require('../models/category')
const auth=require('../middleware/auth')
const admin=require('../middleware/admin')

//GET METHODI
router.get('/', async(req, res)=>{
    // throw new Error('Toifalarni chiqarishda xatolik')
    const categories=await Category.find().sort('name')
    res.send(categories);
})

//GETBYID METHODI
router.get('/:id', async(req, res)=>{
    const category=await Category.findById(req.params.id)
    if(!category){
        res.send('Bunday IDga ega category aniqlanmadi!')
    }
    res.send(category);
})

//POST METHODI
router.post('/', auth, async(req, res)=>{

    const {error}=validate(req.body)

    if(error)
    return res.status(400).send(error.details[0].message);

    let category=new Category({
       name:req.body.name
    })
    category=await category.save();
    res.status(201).send(category);

});

//PUT METHODI
router.put('/:id', auth, async (req, res)=>{
const {error}=validate(req.body)
if(error)
return res.status(400).send(error.details[0].message)
let category=await Category.findByIdAndUpdate(req.params.id,{name:req.body.name},
    {new: true});

    if(!category)
    return res.status(400).send('Berilgan IDga teng category topilmadi!')

    res.send(category);
});

//DELETE METHODI

router.delete('/:id', [auth, admin], async (req, res)=>{
    let category=await Category.findByIdAndRemove(req.params.id)
    if(!category)
    return res.status(400).send('Bunday IDga ega category topilmadi!');

    res.send(category);
})



module.exports=router;
