const path = require('path')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const bcrypt = require('bcrypt')
const {AuthValid} = require('../validations/AuthValidations')
const { body, check, validationResult } = require('express-validator');


const AuthController = {
    postRegister: async (req, res, next) =>{
       console.log("hello");
       console.log(req.body);
       
       const errors = validationResult(req);
        if(!errors.isEmpty()){
            // console.log(error)
            return res.status(400).json(errors.array())
        }
        res.json({
            success: true,
        });

    // Регистрация 
        // const pass = req.body.passwordHash;
        // const salt = await bcrypt.genSalt(15);
        // const passH = await bcrypt.hash(pass, salt);            
        // await global.sequelize.query(
        //     `insert into users(username, email, passwordHash, avatarUrl, role) values(
        //         '${req.body.username}', '${req.body.email}', '${passH}', '${req.body.avatarUrl}', 'user')`);
    // Регистрация 


    }
}

module.exports = AuthController