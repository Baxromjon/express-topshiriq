const express=require('express');
const router=express.Router();
const {Customers, validate}=require('../models/customers');
const auth=require('../middleware/auth');

//GET METHODI
router.get('/', async(req,res)=>{
    const customers=await Customers.find().sort('name');
    res.send(customers);
});

//GETBYID METHODI
router.get('/:id', async(req, res)=>{
    const customer=await Customers.findById(req.params.id);
    
    if(!customer)
    return res.status(400).send('Bunday IDga ega customer topilmadi!');

    res.send(customer);
});
//POST METHOD
router.post('/', auth, async(req, res)=>{
    const {error}=validate(req.body);
    
    if(error)
    return res.status(400).send(error.details[0].message);

    let customer=Customers({
        name:req.body.name,
        isVip:req.body.isVip,
        phone:req.body.phone
    });

    customer=await customer.save();
    res.send(customer);
})
//PUT METHODI
router.put('/:id', auth, async(req, res)=>{
const {error}=validate(req.body)
if(error)
return res.status(401).send(error.details[0].message)

    const customer = await Customers.findByIdAndUpdate(req.params.id,
        {name:req.body.name,
            isVip:req.body.isVip,
            phone:req.body.phone
        },
        {new:true});
    if(!customer)
    return res.status(400).send('Bunday IDga ega customer topilmadi!');

    res.send(customer);
})
//DELETE METHODI
router.delete('/:id', auth,async(req, res)=>{
    const customer= await Customers.findByIdAndRemove(req.params.id);
    if(!customer)
    return res.status(400).send('Bunday IDga ega customer topilmadi!')

    res.send(customer);
})




    module.exports=router
