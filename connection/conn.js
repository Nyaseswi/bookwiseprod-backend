const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Get MongoDB URI from environment variable
const mongoURI = process.env.MONGODB_URI;
const collectionName = process.env.COLLECTION_NAME;
const jwtSecret = process.env.JWT_SECRET;

// Define MongoDB store
const store = new MongoDBStore({
    uri: mongoURI,
    collection: collectionName,
});

// Express session middleware
const required_session = session({
    secret: jwtSecret,
    resave: false,
    saveUninitialized: true,
    store: store
});

// Connect to MongoDB using the URI from .env
mongoose.connect(mongoURI)
    .then(() => console.log('Mongodb Connection success'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = required_session;
