const jwt = require('jsonwebtoken')

module.exports = function checkRole(req, res, next) {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token){
        try{
            const decoded = jwt.verify(token, accessKey);
            req.role = decoded.role;
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