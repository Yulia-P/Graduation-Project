const { validationResult } = require('express-validator');

module.exports = function ValidError(req, res, next){
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            // console.log(error)
            return res.status(400).json(errors.array())
        }
    next();
}