const express = require('express')
const KeysController = require("../controllers/KeysController");
const checkRole = require('../utils/checkRole');

let router = express.Router()

router.post('/keys', checkRole, KeysController.addKeys);

module.exports = router