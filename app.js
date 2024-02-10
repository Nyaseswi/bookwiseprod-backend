const express = require('express');
const app = express();
const cors = require('cors');
// importing the package exression- session 
// const session = require('express-session');

const bookRoute = require('./routes/booksRoutes')
const userRoute = require('./routes/userRoutes')

const mongoConn = require('./connection/conn');
app.use(cors());
app.use(express.json());
app.use(mongoConn);
app.use(express.urlencoded({extended: true}))
app.use('/api/v1/',bookRoute);
app.use('/api/users/',userRoute);



app.listen(1000,()=>{
    console.log('Server Started Successfully');
});