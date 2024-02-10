const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{ 
        type:String,
        required: false,
    },
    author:{
        type:String,  
        required: true,
    },
    avaiable:{
        type:Boolean,
        required: false
    },
    image:{
        type:String,
        required: true,
    },
    price:{
        type: Number,
        required:true
    }

    }
)

module.exports = new mongoose.model('books',bookSchema);