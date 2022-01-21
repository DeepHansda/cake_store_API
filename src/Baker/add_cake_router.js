const cake_router = new require('express').Router();
const Add_Cake_Model = require('../Database/Models/admin/all_cakes');
const upload = require('../middleware/FileUpload')


cake_router.post('/admin/addCake',upload.array('images',5),async(req, res,err)=>{
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.filename,
                filePath: element.path,
                fileType: element.mimetype,
            }
            filesArray.push(file);
        });
        const cakeData = new Add_Cake_Model({
            cake_name: req.body.cake_name,
            cake_description:req.body.cake_description,
            weight:req.body.weight,
            mobile_number:req.body.mobile_number,
            price:req.body.price,
            images:filesArray
        });
        const savedCakeData = await cakeData.save();
        res.status(200).json({
            message: 'Success',
            status: 'ok'
        })
        if(err)
        res.status(400).send(err);

    }
    catch(err){
        res.status(400).send(err);
        console.log(err)
    }
})

cake_router.patch('/admin/editCake/:id',async(req, res)=>{
    try{
        const _id = req.params.id;
        const putProduct = await Add_Cake_Model.findByIdAndUpdate(_id,req.body,{
            new:true
        });

        res.status(200).send(putProduct)
    }
    catch(err){
        res.status(400).send(err);
        console.log(err)
    }
})

cake_router.get('/admin/getCake',async(req,res)=>{
    try{
        const cakeData = await Add_Cake_Model.find().sort("-createdAt");
        res.status(200).send(cakeData);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = cake_router;