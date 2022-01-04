const mongoose  = require('mongoose');

const RegSchema = mongoose.Schema({
    name:{
        type: String,
    },

    email:{
        type: String,
        unique: true
    },


    password:{
        type: String,
    }
})

const regModel = mongoose.model('Registered_admin',RegSchema);



module.exports = regModel;