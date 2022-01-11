const cake_router = new require('express').Router();
const multer = require('multer');
const Add_Cake_Model = require('../Database/Models/admin/all_cakes');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../uploaded_images')
    },
    filename :(req,file,cb)=>{
        const match = ["image/png", "image/jpeg"];
        if(match.indexOf(file.mimetype) === -1){
            var message = `${file.originalname} is not a valid file, only accept png/jpeg`
            return cb(null, message);
        }
        else{
            var filename = `$bakerImg/{Date.now} cakee it ${file.originalname}`
            cb(null,filename)
        }
        
    }
})

const upload = multer({
    storage:storage,
    limits:{
        fileSize : 1*1024*1024,
    }
}).array('file',5)

cake_router.post('/admin/addCake',async(req, res)=>{
    try{
        await upload(req, res,(err)=>{
            if(err){
                console.log(err),
                res.status(400).json({message:err})
            }
            else{
                if(req.file==undefined){
                    res.status(400).json({message:'no images selectead'})
                }
                res.status(200).json({
                    message:"file uploaded",
                    file:req.file
                })
            }
        })
   
        // const cakeData = new Add_Cake_Model(req.body);
        // const savedCakeData = await cakeData.save();
        // res.status(200).send(savedCakeData)
    }
    catch(err){
        res.status(500).send(err.message);
        console.log(err)
    }
})

cake_router.patch('/admin/addCake/:id',async(req, res)=>{
    try{
        const _id = req.params.id;
        const putProduct = await Add_Cake_Model.findByIdAndUpdate(_id,req.body,{
            new:true
        });

        res.status(200).send(putProduct)
    }
    catch(err){
        res.status(500).send(err.message);
        console.log(err)
    }
})

cake_router.get('/admin/getCake',async(req,res)=>{
    try{
        const cakeData = await Add_Cake_Model.find();
        res.status(200).send(cakeData);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = cake_router;