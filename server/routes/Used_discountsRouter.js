const express = require('express')
const Used_discountsController = require("../controllers/Used_discountsController");
const checkRole = require('../utils/checkRole');
const checkAuth = require('../utils/checkAuth');

let router = express.Router()

router.get("/UDiscounts", checkAuth, Used_discountsController.showMyDiscounts)
router.put("/UDiscounts/:id", checkAuth, Used_discountsController.usedDiscounts)

module.exports = router