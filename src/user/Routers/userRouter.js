const express = require('express');
const userRouter = new express.Router();
const bcrypt = require('bcrypt');
const RegMod = require('../../Database/Models/users/user_signUp')
userRouter.post('/user/signUp',async(req,res)=>{
    try{
        const newUser = new RegMod(req.body);
        const savedUser = await newUser.save();
        res.status(200).send(savedUser)
    }
    catch(err){
        console.log(err);
    }
})

userRouter.get('/user/showData',async(req, res)=>{
    try{
    await RegMod.find((err,data)=>{
        if(err){
            res.status(400).send(err)
            console.log(err)
        }

        else{
            res.status(200).send(data)
        }
    }).sort("-time")
}
catch(err){
    console.log(err);
}
})

userRouter.post('/user/login',async(req, res)=>{
    try{
        const {email,password} = req.body;
        const newUser = await RegMod.findOne({email})
        const compare = await bcrypt.compare(password,newUser.password);
        if(compare){
            res.status(200).send("login successful");
        }
        else{
            res.status(404).send("email or password incorrect");
        }
    }
    catch(err){
        console.log(err);
    }
})

module.exports = userRouter;