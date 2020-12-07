const userModel = require('../models/user_model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mailUtil = require('../../utils/mail_utils')

const userSignUp = async(req, res) => {

    try{
        let postData = userModel.signUpPostData(req)
        let oldUser = await userModel.User.findOne({email: postData.email})

        if(!oldUser){

            const salt = await bcrypt.genSalt(10) // using solt round 10
            postData.password = await bcrypt.hash(req.body.password, salt);

            let user = userModel.User(postData)
            let data = await user.save()
            if(data) {
                res.status(201).json({
                    message : "Signed up successfully.",
                    success : true
                });
                // mailUtil.sendMail()
            } else {
                res.status(409).json({
                    message : "Signup error !",
                    success : false
                });
            }
        }else{
            res.status(409).json({
                message : "You have already signed up.",
                success : false
            });
        }
    }catch(err){
        console.log("ERROR:",err);
        res.status(500).json({
          success : false,
          message : "Internal Server Error Occurred."
        });
    }
}


const userSignIn = async(req, res) => {
    try{

        let email = req.body.email;
        let password = req.body.password;

        if(!email || !password){
            res.status(401).json({
                success : false,
                message : "Email or password not given."
            });
        }

        let data = await userModel.User.findOne({email});

        if(data){

            bcrypt.compare(password, data.password, async(err,valid) => {
                if(err || !valid) {
                    console.log("ERROR","bcrypt")
                    return res.status(401).json({
                        success : false,
                        message : "Password mismatched."
                    });
                } else {
                    let token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 180), /* 6 month*/
                        data: {
                            _id : data._id,
                            email: data.email,
                            name : data.name,
                            phone : data.phone,
                            role : data.role
                        }
                    }, process.env.TOKEN_SECRET)
                    return res.status(200).json({
                        success : true,
                        message : "Signed in successfully.",
                        data : {
                            id : data._id,
                            name : data.firstName + " " +data.lastName,
                            token : token,
                        }
                    });
                }
            })

        } else {
            res.status(469).json({
                success : false,
                message : 'Please register your account before log in.'
            });
        }

    }catch(err){
        console.log("ERROR:",err);
        res.status(500).json({
            success : false,
            message : "Internal Server Error Occurred."
        });
    }
}

module.exports = {
    userSignUp, userSignIn
}