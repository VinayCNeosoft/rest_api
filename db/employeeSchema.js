const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String
    }
})

module.exports = mongoose.model("employeeData",employeeSchema)