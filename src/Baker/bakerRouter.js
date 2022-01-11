const express = require('express');
const router =new express.Router();
const Reg = require('../Database/Models/baker/reg')
const bcrypt = require('bcrypt')

router.post('/baker/signup',async(req, res)=>{
    try {
        const newBaker = new Reg(req.body);
        const saveBaker = await newBaker.save().then(

                res.status(200).json({
                    status: 'success',
                    message: 'registration successful'
                })
        )

    
}
    catch (err){
        console.log(err)
        res.status(400).json({
            status: 'error',
            message: 'registration faild .'
        })
    }
})

router.get('/baker/getbakers',async(req, res)=>{
    try {
        const getAll = await Reg.find((err,data)=>{
            if(err) {
                console.log(err)
                res.status(404).json({
                    status: 'error',
                    message: 'empty database'
                })
            }

            else {
                res.status(200).send(data)
            }
        }).sort("-date_of_joining")
    }

    catch (err){
        console.log(err)
    }
})

router.post('/baker/login',async(req, res)=>{
    try{
        const {phone_number,password} = req.body;
        const newUser = await Reg.findOne({phone_number})
        console.log(newUser.password)

        const compare = await bcrypt.compare(password,newUser.password);
        if(compare){
            res.status(200).json({
                status: 'success',
                message: 'login successful'
            });
        }
        else{
            res.status(404),json({
                status:"error",
                message:"phone number or password incorrect"
            }
                );
        }
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router