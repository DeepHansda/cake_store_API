const express = require('express');
const dotenv  = require('dotenv');
const userRouter = new express.Router();
const bcrypt = require('bcrypt');
const RegMod = require('../../Database/Models/users/user_signUp')
const auth = require('../../middleware/Auth')

dotenv.config()
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
    const users = await RegMod.find().sort("-time")
    res.status(200).send(users)
    
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

userRouter.post('/user/sms',async(req, res)=>{
    try{
        var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'ap-south-1'});
const {msg,number} = req.body

// Create publish parameters
var params = {
  Message: msg, /* required */
  PhoneNumber: number,
};

// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
  function(data) {
    console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
    }
    catch(err){
        console.log(err);
    }
})

module.exports = userRouter;