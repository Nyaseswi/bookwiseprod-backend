const mongoose = require('mongoose');
// importing the package exression- session 
const session = require('express-session');

// importing the package npm i connect-mongodb-session and assigning above session here as function 
const MongoDBStore = require('connect-mongodb-session')(session);

// storing the session in mongodb 
const store = new MongoDBStore({
    uri:  "mongodb+srv://abcd:1234@cluster0.b3kjian.mongodb.net/bookWise?retryWrites=true&w=majority",
    collection: 'mySession',
    
})

// with help of middleware register the express session, we created a session here
// to store the created session in Mongodb we need package npm i connect-mongodb-session
const required_session = session({
    secret:'This is a secret',
    resave:false,
    saveUninitialized:true,
    store: store
})


mongoose.connect(
    "mongodb+srv://abcd:1234@cluster0.b3kjian.mongodb.net/bookWise?retryWrites=true&w=majority"
)
.then(() => console.log('Mongodb Connection success'));

module.exports = required_session;
