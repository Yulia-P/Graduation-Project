const express = require('express')
const DiscountsController = require("../controllers/DiscountsController");
const validator = require('../validations/DiscountsValidations');
const checkRole = require('../utils/checkRole');
const chekAuth = require('../utils/checkAuth');
const ValidError = require('../utils/HandleErrors');

let router = express.Router()

router.get('/Discounts',  checkRole, DiscountsController.getDiscounts);
// router.get('/DiscountU',  chekAuth, DiscountsController.getDiscountsU);
router.post('/Discounts', checkRole, validator.addDiscounts, ValidError, DiscountsController.addDiscounts);
router.put('/Discounts/:id', checkRole, validator.editDiscounts, ValidError, DiscountsController.editDiscounts);
router.delete('/Discounts/:id', checkRole, DiscountsController.deleteDiscounts);


module.exports = router