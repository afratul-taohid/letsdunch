const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim : true,
    },
    lastName:{
        type: String,
        required: true,
        trim : true,
    },
    email:{
        type: String, 
        unique : true,
        required : true,
        lowercase : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
        min : [6, 'Too Short Password'],
    },
    address : {
        country : {
            type : String,
            trim : true,
        },
        city : {
            type : String,
            trim : true,
        },
        postalCode : {
            type : Number,
            trim : true,
        },
    },
    profile : {
        phone : {
            type : String,
        },
        gender : {
            type : String,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model('users', userSchema)

function signUpPostData(req) {
    return {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
}

module.exports = {
    User,
    signUpPostData
}