const jwt = require('jsonwebtoken')

module.exports = function checkRole(req, res, next) {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (!token) {
        return res.status(403).json({
            message: 'Нет доступа(роль)',
        });
    } else {
        try {
            const decoded = jwt.verify(token, accessKey);
            // console.log(decoded)
            req.role = decoded.role;
            const v_role = decoded.role
            // console.log(v_role)
            if(v_role === 'admin')
            {
                console.log('HELLO')
                next();
            }
            else {
                return res.json({
                    message: 'Нет доступа(роль)'
                })
            }
            // req.role === 'admin';

        } catch (e) {
            return res.json({
                message: 'Нет доступа(роль)',
            });
        }
    }
}