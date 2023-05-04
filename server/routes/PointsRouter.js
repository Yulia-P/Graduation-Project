const express = require('express')
const PointsController = require("../controllers/PointsController");
const checkRole = require('../utils/checkRole');
const checkAuth = require('../utils/checkAuth');

// const ValidError = require('../utils/HandleErrors');
// const validator = require('../validations/PointsValidations');

let router = express.Router()

router.get   ('/points',         checkAuth, PointsController.getPoints);
router.get   ('/points/:id',     checkRole, PointsController.getPoint);
router.get   ('/points/marks/:marks_id',     checkRole, PointsController.getPointByMarks);
router.post  ('/points',         checkRole, checkAuth, PointsController.addPoints);
router.put   ('/points/key/:id', checkRole, checkAuth, PointsController.editPointsKey);
router.put   ('/points/:id',     checkRole, checkAuth, PointsController.editPoints);
router.delete('/points/:id',     checkRole, PointsController.deletePoints);

module.exports = router