const { body } = require('express-validator');

exports.addDiscounts  = [
    body('Discount', 'Введите скидку').isLength({min: 10}),
    body('PointD', 'Вы ввели не число').isNumeric()
];

exports.editDiscounts  = [
    body('Discount', 'Введите скидку').isLength({min: 10}),
    body('PointD', 'Вы ввели не число').isNumeric()
];