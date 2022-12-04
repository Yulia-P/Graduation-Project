const path = require('path')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const bcrypt = require('bcrypt')
const {chekAuth} = require('../utils/checkAuth')
const { validationResult } = require('express-validator');

const AuthController = {
    // Регистрация     
    RegisterUser: async (req, res, next) =>{
    //обработка ошибок 
    try{    
        const pass = req.body.passwordHash;
        const salt = '$2b$10$qNuSSupDD53DkQfO8wqpf.';
        const passH = await bcrypt.hash(pass, salt);            
        await global.sequelize.query(
            `insert into users(username, email, passwordHash, avatarUrl, role) values(
                '${req.body.username}', '${req.body.email}', '${passH}', '${req.body.avatarUrl}', 'user')`);
                res.status(200).json({ //отправляем пользователю
                    message: 'Регистрация прошла успешно'
                });
            }
        catch(err){
            console.log(err);
            res.status(500).json({ //отправляем пользователю
                    message: 'Не удалось зарегистрироваться'
                });
        }
    // Регистрация 
    },

    // Логин
    LoginUser: async (req, res, next) => {
        try{
        const candidate = await db.models.Users.findOne({
            where: {
                username: req.body.username,
            }})

            if(!candidate){
                return req.status(404).json({
                    message: 'Неверный логин или пароль'
                });
            }
            const isValidPass = await bcrypt.compare(req.body.passwordHash, candidate.passwordHash);
            if (!isValidPass){
                return req.status(404).json({
                    message: 'Неверный логин или пароль',
                });
            }
            const accessToken = jwt.sign({id: candidate.id, username: candidate.username,  role: candidate.role}, accessKey, {expiresIn: 30 * 60})
            const refreshToken = jwt.sign({id: candidate.id, username: candidate.username,  role: candidate.role}, refreshKey, {expiresIn: 24 * 60 * 60})
           
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'strict'
            })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'strict'
            })
            // res.redirect('/main');
            res.json({
                accessToken,
                refreshToken
            });
        }
    catch(err){
        console.log(err);
            res.status(500).json({ //отправляем пользователю
                    message: 'Не удалось авторизоваться'
                });
    }
        // else {
        //     // res.redirect('/login')
        //     res.json({
        //         success: false,
        //     });
        // }
    //Логин
    },

    // Выход
    Logout: (req, res, next) => {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.json({
            success: true,
        });
        // res.redirect('/login')
    },

    getMe: async (req, res, next) => {
    try{
        const user = await db.models.Users.findOne({
            where: {
                id: req.userId,
            }})
        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден' ,
            })
        }
        res.json({ user  });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ //отправляем пользователю
                message: 'Не удалось найти пользователя'
            });
    }},
    
    // Получить роль
    getRole: (req, res, next) => {
        let userRole = 'user';
        let adminRole = 'admin';
        if(req.user != undefined){
            switch(req.user.role){
                case 'user': {
                    res.send(JSON.stringify(userRole))
                    break;
                }
                case 'admin': {
                    res.send(JSON.stringify(adminRole))
                    break;
                }
            }
        }
     }
}
module.exports = AuthController