const { body } = require('express-validator');

exports.addArticles  = [
    body('Title', 'Введите текст статьи').isLength({min: 3 }).isString(),
    body('Text', 'Введите текст статьи').isLength({min: 9 }).isString(),
    // body('ImageU', 'Неверная ссылка на изображение').isString(),
];

exports.updateArticles  = [
    body('Title', 'Введите текст статьи').isLength({min: 3 }).isString(),
    body('Text', 'Введите текст статьи').isLength({min: 9 }).isString(),
    // body('ImageU', 'Неверная ссылка на изображение').isString(),
];