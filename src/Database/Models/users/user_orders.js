const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema(
        {
        
        product_details:{
            cake_id:String,
            cake_type: String,
            name: String,
            weight: String,
            egg_type: String,
            price: Number,
            flavour:String,
            shape:String,
            layers:String,
            sponge:String,
            saint:String,
            fillings:String,
            border_effect: String,
            designs:String,
            effects:String,
            cake_text:String,



        },
        user_details:{
            user_id:String,
            name:String,
            phone_number:String,
            delivery_city:String,
            pin_code:Number,
            delivery_address:String,
            shipping_partner:String,
            time_Date: Date,
            time : { type : Date, default: Date.now },
            payment:{
                type : Boolean,
                default: false
            },
            delivered: {
                type : Boolean,
                default: false
            }

        },

        createAt :{
            type : Date,
            default : Date.now
        }


    

})

const orderModel = mongoose.model('orders',orderSchema);

module.exports = orderModel;