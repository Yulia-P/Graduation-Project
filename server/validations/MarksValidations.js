const { body } = require('express-validator');

exports.addMarks  = [
    body('Rubbish', 'Введите вид отходы').isLength({min: 3}),
    body('PointsOKg', 'Вы ввели не число').isNumeric(),
    body('NewOKg', 'Вы ввели не число').isNumeric(),

];

exports.editMarks  = [
    body('Rubbish', 'Введите вид отходы').isLength({min: 3}),
    body('PointsOKg', 'Вы ввели не число').isNumeric(),
    body('NewOKg', 'Вы ввели не число').isNumeric(),
];