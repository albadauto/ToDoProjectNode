const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginModel = new Schema({
    email:{
        type:String
    },
    senha:{
        type:String
    },
    registerDate:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model('LoginModel', LoginModel)