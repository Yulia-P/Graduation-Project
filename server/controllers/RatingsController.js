const db = require('../config/db')

const RatingsController = {

    getRatings: async(req, res, next) => {
        try {
            db.models.Ratings.findAll({
                include: [{
                    model: db.models.Users,
                    required: true,
                    attributes: ["id", "username", "avatarUrl"],
                }], 
                where: {Item: req.params.Item}
            }
        )
        .then(expense => {res.send(JSON.stringify(expense)), console.log(JSON.stringify(expense))})

        } catch (error) {
            
        }

    },

    addRatings: async(req, res, next) => {
        try {
            db.models.Ratings.create({
                Item: req.params.Item,
                Commentator: req.userId,
                Сomment: req.body.Comment,
            })
            res.status(200).json({
                message: 'Комментарий добавлен'
            });
        } catch (err ) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось добавить комментарий'
            });
        }
    },

    deleteRatings: async(req, res, next) => {
        db.models.Ratings.destroy({ where: {id: req.params.id}}).then(() => {res.send();})
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Не удалось удалить статью',});
        })
        .then((res) => {
            console.log(res);
        });
    },

}

module.exports = RatingsController