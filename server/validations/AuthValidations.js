const { body, check, validationResult } = require('express-validator');

exports.postRegister  = [
body('email').isEmail().normalizeEmail(),
body('passwordHash').isLength({min: 9 }),
body('username').isLength({min: 3}),
body('avatarUrl').optional().isURL()];

// const db = require('../config/db')

// function isIdUnique (username, email) {
//    await db.models.Users.findOne({
//         where: {username: req.params.username || email: req.params.email}
//   }