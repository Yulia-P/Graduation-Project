const { body } = require('express-validator');

exports.Receptions  = [
    body('Weight', 'Вы ввели не число').isNumeric(),
    body('TypeWaste', 'Введите тип сдаваемых отходов').isLength({min: 3 }).isString(),
    body('StationKey', 'Ключ слишком маленький').isLength({min: 8 }).isString(),
];