const { body } = require('express-validator');

exports.RegisterUser  = [
    body('email', 'Неверный формат почты').isEmail().normalizeEmail(),
    body('email', 'Почта слишком длинная').isLength({max: 50}),
    body('password', 'Слишком маленький пароль, минимум 9 символов').isLength({min: 9 }),
    body('username', 'Укажите имя ползователя').isLength({min: 3}),
    body('avatar_url', 'Неверная ссылка на фото').optional().isURL()
];

exports.LoginUser  = body('email', 'Укажите почту').isLength({min: 3});