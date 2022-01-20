const express = require('express');
const order_router = new express.Router();

const User_order = require('../../Database/Models/users/user_orders');


order_router.post('/user/order',async(req, res)=>{
        try{
            const newOrder = new User_order(req.body);
            const saveOrder = await newOrder.save();
            if(saveOrder==null){
                res.status(404).send("somthing wrong")
            }
            else{
                res.status(200).send(saveOrder)
            }
        }
        catch(err){
            console.log(err);

        }
})


order_router.patch('/user/editOrders/:id',async(req, res)=>{
        try{
            const _id = req.params.id;

            const editOrders = await User_order.findByIdAndUpdate(
                _id,
                req.body,{new: true}
                
            )

            res.status(200).send(editOrders);
        }
        catch(err){
            console.log(err);
        }
})

order_router.get('/user/findOrder/:id',async(req, res)=>{
    try{
        const _id = req.params.id;
        const findOne = await User_order.findById(_id,(err,data)=>{
            if(err){
                console.log(err);
                res.status(400).send(err);
            }
            else{
                res.status(200).send(data);

            }
        })

    }
    catch(err){
        console.log(err);
    }
})

order_router.get('/user/getOrders',async(req, res)=>{
    try{
        const findOrder =await User_order.find().sort("-createdAt")
        res.status(200).send(findOrder);
        
    }
    catch(err){
        console.log(err);
    }
})
module.exports = order_router;
