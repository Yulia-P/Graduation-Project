const { body } = require('express-validator');

exports.addArticles  = [
    body('title', 'Введите текст статьи').isLength({min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({min: 9 }).isString(),
    // body('image_url', 'Неверная ссылка на изображение').isString(),
];

exports.updateArticles  = [
    body('title', 'Введите текст статьи').isLength({min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({min: 9 }).isString(),
    // body('image_url', 'Неверная ссылка на изображение').isString(),
];


