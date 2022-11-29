const express = require('express')
const AuthController= require('../controllers/AuthController')
const  validator = require('../validations/AuthValidations')

let router = express.Router()
router.post('/register', validator.postRegister, AuthController.postRegister)
// router.post('/register',  AuthController.postRegister)

module.exports = router