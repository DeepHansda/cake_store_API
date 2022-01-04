const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');

const RegMode = require('../../Database/Models/users/user_signUp')







router.post('/user/login',async(req, res)=>{

    try {

        const {email,password} = req.body
        const logmain = await RegMode.findOne({email});
        const token = await logmain.generateAuthToken();
        res.cookie("jwt",token)
        const compare = await bcrypt.compare(password,logmain.password);
        if(compare){
            res.status(200).send("login successful")
            console.log("login successful")
        }
        else{
            res.status(404).send("Please Register Or login details invalid")
        }
    }

    catch(err){
        console.log(err)
    }
})


router.post("/user/signUp",async(req,res)=>{
    try {
    const reg = new RegMode(req.body);

    const token = await reg.generateAuthToken();

    console.log("this is reg token" + token);
    res.cookie("jwt",token);

    const saveRegUser = await reg.save();
    res.status(200).send(saveRegUser)
    }

    catch(err) {
        res.status(500).send(err)
        console.log(err)
    }
    
})

module.exports = router;

