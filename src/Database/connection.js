const mongoose = require('mongoose');
const mongoo_uri = 'mongodb://localhost:27017/cakee_it';
const mongo_params ={
    useNewUrlParser:true,
    useUnifiedTopology:true,
}
mongoose.connect(mongoo_uri,mongo_params).
then(()=>{
    console.log("mongodb Connected");
}).
catch(err =>console.error(err));