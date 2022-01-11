const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const RegSchema =mongoose.Schema({
    name:String,
    email:{
       type: String,
       unique: true
    },
    address:String,
    password:String,
    time:{type:Date, default:Date.now}


})
RegSchema.pre("save",async function(next) {
    if(this.isModified("password")) {
        const hash_password = await bcrypt.hash(this.password,10);
        this.password = hash_password;
    }

    next();
})
const regModel = mongoose.model('saved_user',RegSchema);

module.exports = regModel;