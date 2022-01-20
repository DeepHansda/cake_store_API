const express = require('express');
const app = express();
const cors = require('cors');
require('./src/Database/connection')
const admin_auth = require('./src/admin/Routers/auth_router');
const user_data = require('./src/user/Routers/userRouter')
const cake_add_router = require('./src/Baker/add_cake_router');
const order_router = require('./src/user/Routers/orders')
const baker_router = require('./src/Baker/bakerRouter')
const shipper_router = require('./src/shipping_partner/shipper_router')
const PORT = process.env.PORT || 3400;
var cookieParser = require('cookie-parser')

app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: '*',
    method: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials: true
}));
app.use(cake_add_router,admin_auth,user_data,order_router,baker_router,shipper_router);



app.get('/', (req, res) => {
    res.status(200).send('hello world')
    console.log(req.cookies.accessToken)
})

app.listen(PORT,() => {console.log('listening on port '+ PORT)});