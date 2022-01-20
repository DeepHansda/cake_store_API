const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        
        cb(null,path.join(__dirname,'../uploaded_images'))
    },
    filename :(req,file,cb)=>{
        const match = ["image/png", "image/jpeg"];
        if(match.indexOf(file.mimetype) === -1){
            var message = `${file.originalname} is not a valid file, only accept png/jpeg`
            return cb(null, message);
        }
        else{
            var filename = `${new Date().toISOString().replace(/:/g, '-')}$_cakee_it${file.originalname}`
            cb(null,filename)
        }
        
    }
})

const upload = multer({
    storage:storage,
   
})

module.exports = upload;