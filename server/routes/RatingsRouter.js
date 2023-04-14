const express = require('express')
const RatingsController = require("../controllers/RatingsController");
const validator = require('../validations/RatingsValidations');
const chekAuth = require('../utils/checkAuth');
const ValidError = require('../utils/HandleErrors');

let router = express.Router()

router.get('/Ratings/:article_id',  RatingsController.getRatings);
router.post('/Ratings/:article_id', chekAuth, validator.addRatings, ValidError, RatingsController.addRatings);
router.delete('/Ratings/:id', chekAuth, RatingsController.deleteRatings);
router.get('/Ratings', RatingsController.getAllRating);



module.exports = router