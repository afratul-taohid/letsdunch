const {Joi, Segments} = require('celebrate')
const joiObjectId = require('joi-objectid');

// add joi-objectId to Joi
Joi.objectId = joiObjectId(Joi);

const userSignUpValidation = {
    [Segments.BODY]: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
    })
}

// const userSignInValidation = {
//     body : Joi.object().keys({
//         email : Joi.string().email().required(),
//         password : Joi.string().required(),
//     })
// }

module.exports = {
    userSignUpValidation
}