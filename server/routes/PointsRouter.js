const express = require('express')
const PointsController = require("../controllers/PointsController");
const validator = require('../validations/PointsValidations');
const checkRole = require('../utils/checkRole');
const chekAuth = require('../utils/checkAuth');
const ValidError = require('../utils/HandleErrors');

let router = express.Router()

// router.get('/Points',  chekAuth, PointsController.getPoints);
router.get('/Points',  PointsController.getPoints);

router.post('/Points', checkRole, validator.addPoints, ValidError, PointsController.addPoints);
router.put('/Points/:id', checkRole, validator.editPoints, ValidError, PointsController.editPoints);
router.delete('/Points/:id', checkRole, PointsController.deletePoints);



module.exports = router