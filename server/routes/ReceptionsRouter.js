const express = require('express')
const ReceptionsController = require("../controllers/ReceptionsController");
const validator = require('../validations/ReceptionsValidations');
const chekAuth = require('../utils/checkAuth');
const ValidError = require('../utils/HandleErrors');

let router = express.Router()

router.post('/Receptions', validator.Receptions, ValidError, chekAuth, ReceptionsController.Receptions);


module.exports = router