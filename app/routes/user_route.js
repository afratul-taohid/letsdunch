const router = require('express').Router()
const {celebrate} = require('celebrate')
const userController = require('../controllers/users_controller')
const userValidation = require('../validations/users_validation')

router.route('/signup').post(
    celebrate(userValidation.userSignUpValidation),
    userController.userSignUp
)

router.route('/signin').post(userController.userSignIn)

module.exports = router