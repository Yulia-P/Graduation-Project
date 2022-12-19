const express = require('express')
const MarksController = require("../controllers/MarksController");
const validator = require('../validations/MarksValidations');
const checkRole = require('../utils/checkRole');
const chekAuth = require('../utils/checkAuth');
const ValidError = require('../utils/HandleErrors');

let router = express.Router()

router.get('/Marks',  chekAuth, MarksController.getMarks);
router.post('/Marks', checkRole, validator.addMarks, ValidError, MarksController.addMarks);
router.put('/Marks/:id', checkRole, validator.editMarks, ValidError, MarksController.editMarks);
router.delete('/Marks/:id', checkRole, MarksController.deleteMarks);


module.exports = router