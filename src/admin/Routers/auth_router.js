const express = require('express');
const authRouter = new express.Router();
const SignUpModel = require('../../Database/Models/admin/admin_signUp');

authRouter.post('/admin/signup',async(req,res)=>{
    try{
        const signUp = new SignUpModel(req.body);
        const saveSignUp =await signUp.save();
        if(saveSignUp){
           const token = await signUp.generateAuthToken()
            res.status(200).json({
                message:"registration successful",
                accessToken:token,
            });
        }
    }
    catch(err){
        res.status(400).send(err);
        console.log(err);
    }

})

authRouter.post('/admin/login',async(req, res)=>{
    try{
        const {email,mobileNumber,password} = req.body;
        // if(email){
        //     var signIn = await SignUpModel.findOne({email});
        // }
         if(mobileNumber){
            var signIn = await SignUpModel.findOne({mobileNumber});
        }
        else if(email || mobileNumber){
            var signIn = await SignUpModel.findOne({email})
        }

        if(password === signIn.password){
            const token = signIn.tokens.token;
            res.status(200).json({
                message: "Login successful",
                accessToken: token,
            });
        }
        else{
            res.status(403).send("invaild passsword or email address");
        }
    }
    catch(err){
        res.status(404).send(err)
    }
})

module.exports = authRouter;