const path = require('path')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const bcrypt = require('bcrypt')
const {chekAuth} = require('../utils/checkAuth')
const { validationResult } = require('express-validator');
const { Op } = require("sequelize");
const uuid = require('uuid');
const nodemailer = require('nodemailer');


const AuthController = {
  
    RegisterUser: async (req, res, next) =>{
    try{    
        const i_password = req.body.password;
        const salt = '$2b$10$qNuSSupDD53DkQfO8wqpf.';
        const o_password = await bcrypt.hash(i_password, salt);   
        
        // const v_check_user = await db.models.Users.findOne({
        const v_check_user = await db.models.Userss.findOne({
            where: {username: req.body.username}
        })

        // const v_check_email = await db.models.Users.findOne({
        const v_check_email = await db.models.Userss.findOne({
            where: {email: req.body.email}
        })

        if (v_check_user==null){
            if(v_check_email==null){
                
                // const v_activation_link = uuid.v4();

                // const candidate = await db.models.Users.create({

                // const candidate = await db.models.Userss.create({
                //     username: req.body.username,
                //     email: req.body.email,
                //     password_hash: o_password,
                //     role: 'user' 
                // })

                const v_activation_link = uuid.v4();
                const send_mail=req.body.email;
                const send_link = 'http://localhost:8082/activate/' + v_activation_link;
            
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                    secure: false,
                    auth:{
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD
                    }
                });

                const mailOptions ={
                    from: process.env.SMTP_USER,
                    to: send_mail,
                    subject: 'Активация аккаунта на ' + process.env.APP,
                    html: 
                            `
                            <div>
                            <h1>Для активации перейдите по ссылке</h1>
                            <a href="${send_link}">${send_link}</a>
                            </div>
                            `
                        }

                transporter.sendMail(mailOptions)
                
                
              
                // sendActivationMail(send_mail, send_link);          


                // const accessToken = jwt.sign({id: candidate.null, username: candidate.username,  role: candidate.role}, accessKey, {expiresIn: 30 * 60})
                // const refreshToken = jwt.sign({id: candidate.null, username: candidate.username,  role: candidate.role}, refreshKey, {expiresIn: 24 * 60 * 60})

                
                // res.cookie('accessToken', accessToken, {
                //     httpOnly: true,
                //     sameSite: 'strict'
                // })
                // res.cookie('refreshToken', refreshToken, {
                //     httpOnly: true,
                //     sameSite: 'strict'
                // })
                res.status(200).json({
                    message: 'Регистрация прошла успешно',
                    // accessToken,
                    // user: {
                    // id: candidate.null,
                    // username: candidate.username, 
                    // role: candidate.role}
                });                

            }
            else{
                res.status(500).json({
                    message: 'Почта занята, введите другую'
                });
            }
        }
        else{
            res.status(500).json({
                message: 'Имя пользователя занято, введите другое'
            });
        }
        }
        catch(err){
            console.log(err);
            res.status(500).json({ //отправляем пользователю
                message: 'Не удалось зарегистрироваться'
            });
        }
    },

    LoginUser: async (req, res, next) => {
        try{
        const i_user = await db.models.Users.findOne({
            where: {
                username: req.body.username,
            }})
            console.log(i_user)

            if(i_user==null){
                res.status(404).json({
                    message: 'Неверный логин или пароль'
                });
            }
            else {
                const isValidPass = await bcrypt.compare(req.body.password, i_user.password_hash);
                if (!isValidPass){
                    res.status(404).json({
                        message: 'Неверный логин или пароль',
                    });
                }
                const accessToken = jwt.sign({id: i_user.id, username: i_user.username,  role: i_user.role}, accessKey, {expiresIn: 30 * 60})
                const refreshToken = jwt.sign({id: i_user.id, username: i_user.username,  role: i_user.role}, refreshKey, {expiresIn: 24 * 60 * 60})
            
                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    sameSite: 'strict'
                })
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'strict'
                })

                res.json({
                    message: 'Авторизация прошла успешно',
                    accessToken,
                    user: {
                    id: i_user.id,
                    username: i_user.username, 
                    role: i_user.role}
                });
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({ 
                message: 'Не удалось авторизоваться'
            });
        }
    },

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