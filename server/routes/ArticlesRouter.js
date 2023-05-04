const express = require('express')
const ArticlesController = require("../controllers/ArticlesController");
const cheсkAuth = require('../utils/checkAuth');
const checkRole = require("../utils/checkRole");

// const validator = require('../validations/ArticlesValidations');
// const ValidError = require('../utils/HandleErrors');
// const { route } = require('./AuthRouter');

let router = express.Router()

router.get   ('/articles',                      ArticlesController.getArticles);
router.get   ('/articles/:id',                  ArticlesController.getArticle);
router.post  ('/articles',           cheсkAuth, ArticlesController.addArticles);
router.put   ('/articles/:id',       cheсkAuth, ArticlesController.updateArticles);
router.delete('/articles/:id',       cheсkAuth, ArticlesController.deleteArticles);
router.delete('/articles/admin/:id', checkRole, ArticlesController.deleteArticlesAdmin);
router.put   ('/like/:id',           cheсkAuth, ArticlesController.like);


// router.get('/ArticlesR',  ArticlesController.getArticlesRating);
// router.post('/Articles', chekAuth, validator.addArticles, ValidError, ArticlesController.addArticles);
// router.post('/Articles', ArticlesController.addArticles);
// router.put('/Articles/:id', chekAuth, validator.updateArticles, ValidError, ArticlesController.updateArticles);
module.exports = router