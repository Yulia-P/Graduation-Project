const express = require('express');
const AuthController= require('../controllers/AuthController');
const  validator = require('../validations/AuthValidations');
const chekAuth = require('../utils/checkAuth');
const ValidError = require('../utils/HandleErrors');

let router = express.Router()

router.post('/register', validator.RegisterUser, ValidError, AuthController.RegisterUser);
router.post('/login',  AuthController.LoginUser);
router.get('/logout', AuthController.Logout);
router.get('/me', chekAuth, AuthController.getMe);
router.get('/activate/:link', AuthController.activate);

module.exports = router