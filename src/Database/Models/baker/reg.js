const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const RegSchema = mongoose.Schema({
    fullName:String,
    phone_number:Number,
    email:String,
    location:String,
    pin_code :Number,
    password:String,
    date_of_joining:{
        type:Date,
        default:Date.now
    }
})

RegSchema.pre("save",async function(next) {
    if(this.isModified("password")) {
        const hash_password = await bcrypt.hash(this.password,10);
        this.password = hash_password;
    }

    next();
})

const RegModel = mongoose.model('registered_bakers',RegSchema);

module.exports = RegModel;