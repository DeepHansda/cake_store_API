const express = require('express');
const app = express();
const cors = require('cors');
require('./src/Database/connection')
const admin_auth = require('./src/admin/Routers/auth_router');
const user_auth = require('./src/user/Routers/user_auth')
const cake_admin = require('./src/admin/Routers/add_cake_router');
const PORT = process.env.PORT || 3400;
app.use(express.json());


app.use(cors({
    origin: '*',
    method: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(cake_admin);
app.use(admin_auth);
app.use(user_auth);
app.get('/', (req, res) => {
    res.status(200).send('Hello World')
})

app.listen(PORT,() => {console.log('listening on port '+ PORT)});