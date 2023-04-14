const { body } = require('express-validator');

exports.addPoints  = [
    body('address', 'Введите адрес').isLength({min: 3}).isString(),
    body('secret_key', 'Ключ слишком короткий').isLength({min: 8}).isString(),
];

exports.editPoints  = [
    body('address', 'Введите адрес').isLength({min: 3}).isString(),
    body('secret_key', 'Ключ слишком короткий').isLength({min: 8}).isString(),
];


