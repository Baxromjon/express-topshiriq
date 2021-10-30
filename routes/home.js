const express=require('express');
const homeRouter=express.Router();

homeRouter.get('/', (req, res)=>{
    res.render('index',{title:'my express app', greeting:'Assalomu alaykum!'});
});

module.exports=homeRouter;