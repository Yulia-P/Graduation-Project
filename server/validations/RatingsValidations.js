const { body } = require('express-validator');

exports.addRatings  = [
    body('Comment', 'Введите текст комментария').isLength({min: 3 }).isString(),
];