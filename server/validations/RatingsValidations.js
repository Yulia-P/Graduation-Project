const { body } = require('express-validator');

exports.addRatings  = [
    body('Comment', 'Введите текст комментария').isLength({min: 3 }).isString(),
    body('Comment', "Введите текст менее 500 символов").isLength({max:500}).isString()
];