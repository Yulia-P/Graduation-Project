const express = require('express')
const PointsController = require("../controllers/PointsController");
const validator = require('../validations/PointsValidations');
const checkRole = require('../utils/checkRole');
const chekAuth = require('../utils/checkAuth');
const ValidError = require('../utils/HandleErrors');
const checkAuth = require('../utils/checkAuth');

let router = express.Router()

router.get('/Points',  chekAuth, PointsController.getPoints);
router.post('/Points', checkRole, checkAuth, PointsController.addPoints);
router.put('/Points/Key/:id', checkRole, checkAuth, PointsController.editPointsKey);
router.put('/Points/:id', checkRole, checkAuth, PointsController.editPoints);
router.delete('/Points/:id', checkRole, PointsController.deletePoints);

module.exports = router