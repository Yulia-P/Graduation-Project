const db = require('../config/db')

const UsersController = {
    getUser: async (req, res) => {
        try {
            const users = await db.models.Users.findOne({
                attributes: ['id', 'username', 'email', 'points', 'role', 'is_activated', 'activation_link'],
                where: { id: req.userId }
            })

            if (!users) {
                return res.json({ message: 'Пользователей нет' })
            }
            else {
                res.json({ users })
            }
        }
        catch (error) {
            console.log(error);
            res.json({
                message: 'Не удалось найти пользователей',
            });
        }
    }
}

module.exports = UsersController