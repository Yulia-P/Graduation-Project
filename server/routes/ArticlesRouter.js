const express = require('express')
const ArticlesController = require("../controllers/ArticlesController");
const validator = require('../validations/ArticlesValidations');
const chekAuth = require('../utils/checkAuth');
const ValidError = require('../utils/HandleErrors');
const { route } = require('./AuthRouter');

let router = express.Router()

router.get('/Articles',  ArticlesController.getArticles);
router.get('/Articles/:id', ArticlesController.getArticle);
router.post('/Articles', chekAuth, validator.addArticles, ValidError, ArticlesController.addArticles);
router.put('/Articles/:id', chekAuth, validator.updateArticles, ValidError, ArticlesController.updateArticles);
router.delete('/Articles/:id', chekAuth, ArticlesController.deleteArticles);
router.put('/Like/:id', chekAuth, ArticlesController.Like);


module.exports = router