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
                '${req.body.username}', '${req.body.email}', '${passH}', 'https://i.pinimg.com/236x/32/42/7b/32427b3d3d6ea2682bba84f463ded708.jpg', 'user')`);

        const candidate = await db.models.Users.findOne({
            where: {
                username: req.body.username,
            }})   

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
            res.status(200).json({
                message: 'Регистрация прошла успешно',
                accessToken,
                user: {
                   id: candidate.id,
                   username: candidate.username, 
                   role: candidate.role}
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
        const user = await db.models.Users.findOne({
            where: {
                username: req.body.username,
            }})

            if(!user){
                return req.status(404).json({
                    message: 'Неверный логин или пароль'
                });
            }
            const isValidPass = await bcrypt.compare(req.body.passwordHash, user.passwordHash);
            if (!isValidPass){
                return req.status(404).json({
                    message: 'Неверный логин или пароль',
                });
            }
            const accessToken = jwt.sign({id: user.id, username: user.username,  role: user.role}, accessKey, {expiresIn: 30 * 60})
            const refreshToken = jwt.sign({id: user.id, username: user.username,  role: user.role}, refreshKey, {expiresIn: 24 * 60 * 60})
           
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'strict'
            })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'strict'
            })

            res.json({
                accessToken,
                user: {
                   id: user.id,
                   username: user.username, 
                   role: user.role}
            });
        }
         catch(err){
            console.log(err);
                res.status(500).json({ //отправляем пользователю
                        message: 'Не удалось авторизоваться'
                 });
             }
    //Логин
    },

    // Выход
    Logout: (req, res, next) => {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.json({
            success: true,
        });
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
    }
}
}
module.exports = AuthController