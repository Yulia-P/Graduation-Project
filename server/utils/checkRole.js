const jwt = require('jsonwebtoken')

module.exports = function checkRole(req, res, next) {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token){
        try{
            const decoded = jwt.verify(token, accessKey);
            // req.userId = decoded.id;
            // req.username = decoded.username;
            req.role = decoded.role;
            // console.log(req.username);
            // console.log( req.role);
            next();
        }
        catch(e){
            return res.status(403).json({
                message: 'Нет доступа(роль)',
            });
        }
    }
    else{
        return res.status(403).json({
            message: 'Нет доступа(роль)',
        });
    }
}