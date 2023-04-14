const express = require('express')
const Check_weightsController = require("../controllers/Check_weightsController");
// const validator = require('../validations/RatingsValidations');
const checkAuth = require('../utils/checkAuth');
const checkRole = require('../utils/checkRole');

const ValidError = require('../utils/HandleErrors');

let router = express.Router()

router.post('/Weight', checkRole, checkAuth, Check_weightsController.addWeight);

module.exports = router