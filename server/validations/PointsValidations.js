const { body } = require('express-validator');

exports.addPoints  = [
    body('Address', 'Введите вид отходы').isLength({min: 3}),
    body('SecretKey', 'Ключ слишком короткий').isLength({min: 8}),
];

exports.editPoints  = [
    body('Address', 'Введите вид отходы').isLength({min: 3}),
    body('SecretKey', 'Ключ слишком короткий').isLength({min: 8}),
];