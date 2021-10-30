const{Enrollment, validate, validateEnrollments}=require('../models/enrollment');
const{Course}= require('../models/courses');
const{Customers}=require('../models/customers');
const mongoose=require('mongoose');
const express= require('express');
const router=express.Router();
const auth=require('../middleware/auth');


//GET METHODI
router.get('/', async(req, res)=>{
    const enrollment=await Enrollment.find().sort('-startDate');
    res.send(enrollment);
    console.log(Customers)
})


//GETBYID METHODI
router.get('/:id', async (req, res)=>{
    const enrollment=await Enrollment.findById(req.params.id)
    if(!enrollment)
    return res.status(400).send('Bunday IDga ega enrollment topilmadi!')

    res.send(enrollment);
})

//POST METHODI
router.post('/', auth, async(req,res)=>{
    const {error}=validateEnrollments(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);
    
    let customer=await Customers.findById(req.body.customerId);
    if(!customer)
    return res.status(400).send('Bunday IDga ega customer topilmadi')

    let course= await Course.findById(req.body.courseId)
    if(!course)
    return res.status(400).send('Bunday Idga ega kurs topilmadi');

    
    let enrollment = new Enrollment({
        customer: {
          _id: customer._id,
          name: customer.name
        },
        course: {
          _id: course._id,
          title: course.title
        },
        courseFee: course.fee
      });
      if (customer.isVip)
        enrollment.courseFee = course.fee - (0.2 * course.fee); //Vip mijozlarga 20% chegirma
    
      enrollment = await enrollment.save();
    
      customer.bonusPoints++;
      customer.save();
    
      res.send(enrollment);
})

//DELETE METHODI
router.delete('/:id', auth, async(req, res)=>{
    const enrollment=await Enrollment.findOneAndDelete(req.params.id);
    if(!enrollment)
    return res.status(400).send('Bunday IDga ega Enrollment topilmadi');
    res.send(enrollment);
})

module.exports=router;