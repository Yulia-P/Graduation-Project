const { body } = require('express-validator');

exports.addPoints  = [
    body('address', 'Введите адрес').isLength({min: 5}).isString(),
    body('time_of_work', 'Введите адрес').isLength({min: 5}).isString(),
    body('link_to_map', 'Введите адрес').isLength({min: 10}).isString(),
    body('point_name', 'Введите адрес').isLength({min: 5}).isString(),
    body('secret_key', 'Ключ слишком короткий').isLength({min: 7}).isString(),
];

exports.editPoints  = [
    body('address', 'Введите адрес').isLength({min: 3}).isString(),
    body('secret_key', 'Ключ слишком короткий').isLength({min: 8}).isString(),
];

exports.addKey  = [
    body('secret_key', 'Ключ слишком короткий').isLength({min: 8}).isString(),
];

