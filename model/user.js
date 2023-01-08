const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        // required
    },
    userName:{
        type:String,
        // required
    },
    email:{
        type:String,
        // required
    },
    password:{
        type:String,
        // required
    },
    boardData:{
        type:[],
    },
    cardData:{
        type:[]
    },
})

module.exports = new mongoose.model('User',userSchema);