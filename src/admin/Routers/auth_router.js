const express = require('express');
const authRouter = new express.Router();
const SignUpModel = require('../../Database/Models/admin/admin_signUp');

authRouter.post('/admin/signup',async(req,res)=>{
    try{
        const signUp = new SignUpModel(req.body);
        const saveSignUp =await signUp.save();
        res.status(200).send(saveSignUp);
    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }

})

authRouter.post('/admin/login',async(req, res)=>{
    try{
        const {email,password} = req.body;
        const signIn = await SignUpModel.findOne({email});

        if(password === signIn.password){
            res.status(200).send("logIn successful");
        }
        else{
            res.status(403).send("invaild passsword or email address");
        }
    }
    catch(err){
        res.status(500).send(err)
    }
})

module.exports = authRouter;