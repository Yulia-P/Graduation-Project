const express = require('express')
const UsersController = require("../controllers/UsersController");
const checkRole = require('../utils/checkRole');
const checkAuth = require("../utils/checkAuth");

let router = express.Router()

router.get('/User', checkAuth, UsersController.getUser);

module.exports = router