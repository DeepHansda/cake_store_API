const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User_schema = mongoose.Schema({
    name:{
        type: String,
    },

    email:{
        type: String,
        unique: true
    },

    address:{
        type: String,
    },

    password:{
        type: String,
    },

    tokens:{
        token:{
            type: String,
            required: true
        }
    }
})
User_schema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id}, "fdgdfgggggggggggggggggg");
        this.tokens = Object.assign(this.tokens, {token:token})
        await this.save();
        return token;

        
    } catch (error) {
        console.error(error)
    }

}


User_schema.pre("save",async function(next){
    if(this.isModified("password")){
        const hash_password = await bcrypt.hash(this.password,10);
        this.password = hash_password;
        
    }

    next()
})

const regModel = mongoose.model('Registered_User',User_schema);

module.exports = regModel;