const cake_router = new require('express').Router();
const Add_Cake_Model = require('../../Database/Models/admin/add_cake_model');

cake_router.patch('/admin/addCake',async(req, res)=>{
    try{
        const cakeData = new Add_Cake_Model(req.body);
        const savedCakeData = await cakeData.save();
        res.status(200).send(savedCakeData)
    }
    catch(err){
        res.status(500).send(err.message);
        console.log(err)
    }
})

cake_router.get('/admin/getCake',async(req,res)=>{
    try{
        const cakeData = await Add_Cake_Model.find();
        res.status(200).send(cakeData);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = cake_router;