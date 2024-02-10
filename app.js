const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
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



app.listen( process.env.HTTP_PORT,()=>{
    console.log('Server Started Successfully');
});