const { body } = require('express-validator');

exports.RegisterUser  = [
    body('email', 'Неверный формат почты').isEmail().normalizeEmail(),
    body('passwordHash', 'Слишком маленький пароль, минимум 9 символов').isLength({min: 9 }),
    body('username', 'Укажите имя ползователя').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка на фото').optional().isURL()
];

exports.LoginUser  =    body('username', 'Укажите имя ползователя').isLength({min: 3});