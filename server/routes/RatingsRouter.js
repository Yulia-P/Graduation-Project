const express = require('express')
const RatingsController = require("../controllers/RatingsController");
const validator = require('../validations/RatingsValidations');
const chekAuth = require('../utils/checkAuth');
const ValidError = require('../utils/HandleErrors');

let router = express.Router()

router.get('/Ratings/:Item',  RatingsController.getRatings);
router.post('/Ratings/:Item', chekAuth, validator.addRatings, ValidError, RatingsController.addRatings);
router.delete('/Ratings/:id', chekAuth, RatingsController.deleteRatings);


module.exports = router