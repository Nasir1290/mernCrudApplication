const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        
    },
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    }
})

exports.User = mongoose.model('userModel',userSchema)

