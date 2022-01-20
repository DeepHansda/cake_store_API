const mongoose  = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();


const RegSchema = mongoose.Schema({
    role:{
        type: String,
        required: true

    },

    email:{
        type: String,
        index:true,
        sparse: true,
        unique: true,
        required: true
        
    },

    mobileNumber:{
        type: Number,
        index:true,
        sparse: true,
        unique: true,
        required: true
    },


    password:{
        type: String,
        required: true

    },
    tokens:{
        token:{
            type: String,
        }
    }
})
RegSchema.methods.generateAuthToken = async function(){
    try{
        token = await jwt.sign({id:this._id},process.env.JWT_SECRET_KEY);
        this.tokens = Object.assign(this.tokens, {token:token})
        await this.save();
        return token;
    }
    catch(err){
        console.error(err)
    }
}
const regModel = mongoose.model('Registered_admin',RegSchema);



module.exports = regModel;