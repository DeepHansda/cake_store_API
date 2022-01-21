const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const mongoo_uri =  process.env.MONGO_URL
// 'mongodb://localhost:27017/cakee_it'
const mongo_params ={
    useNewUrlParser:true,
    useUnifiedTopology:true,
}
mongoose.connect(mongoo_uri,mongo_params).
then(()=>{
    console.log("mongodb Connected");
}).
catch(err =>console.error(err));