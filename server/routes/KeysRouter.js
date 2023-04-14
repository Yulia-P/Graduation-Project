const express = require('express')
const KeysController = require("../controllers/KeysController");
const checkRole = require('../utils/checkRole');
const checkAuth = require('../utils/checkAuth');

let router = express.Router()

router.post('/Keys', checkRole, checkAuth, KeysController.addKeys);

module.exports = router