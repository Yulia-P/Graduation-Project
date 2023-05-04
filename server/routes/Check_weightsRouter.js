const express = require('express')
const Check_weightsController = require("../controllers/Check_weightsController");
const checkAuth = require('../utils/checkAuth');
const checkRole = require('../utils/checkRole');

// const validator = require('../validations/RatingsValidations');
// const ValidError = require('../utils/HandleErrors');

let router = express.Router()

router.post('/weight', checkRole, checkAuth, Check_weightsController.addWeight);

module.exports = router