const db = require('../config/db')

const RatingsController = {

    getRatings: async(req, res, next) => {
        try {
            
            const v_check_article = await db.models.Articles.findOne({
                where: {id: req.params.article_id}
            })

            if (v_check_article!=null){
                db.models.Ratings.findAll({
                    include: [{
                        model: db.models.Users,
                        required: true,
                        attributes: ["id", "username", "avatar_url"],
                    }],
                    where: {article_id: req.params.article_id}
                }).then(expense => {
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(expense)), 
                    console.log(JSON.stringify(expense))})
                }
                else {
                    res.status(500).json({
                        message: 'Такой статьи мы не нашли'
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: 'Не удалось найти рейтинг статьи'
                });
            }
        },

    getAllRating: async(req, res, next) => {
        try {
            db.models.Ratings.findAll({                
                include: [{
                    model: db.models.Users,
                    required: true,
                    attributes: ["id", "username", "avatar_url"],
                }],
               
            }
        )
        .then(expense => {
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify(expense)),
                console.log(JSON.stringify(expense))})

        } catch (error) {
            
        }

    },

    addRatings: async(req, res, next) => {
        try {
            const v_check_body = req.body.comment
            if (!v_check_body){
                res.
                status(418).
                json({
                    message: 'Введите текст комментария'
                });
            }
            else {
                const v_check_a_article = await db.models.Articles.findOne({
                    where: {id: req.params.article_id}
                })
                if(v_check_a_article!=null){
                    db.models.Ratings.create({
                        article_id: req.params.article_id,
                        commentator: req.userId,
                        comment: req.body.comment,
                    })
                    res.status(200).json({
                        message: 'Комментарий добавлен'
                    });
                }
                else{
                    res.
                    status(418).
                    json({
                        message: 'Статья не существует'
                    });
                    //    501 Not Implemented («не реализовано»)
                }
            }
        } catch (err ) {
            console.log(err);
            res.
            status(418).
            json({
                message: 'Не удалось добавить комментарий'
            });
        }
    },

    deleteRatings: async(req, res, next) => {

        try {
            const v_check_comment = await db.models.Ratings.findOne({
                where: {id: req.params.id},
            })
            
            if(v_check_comment!=null){
                db.models.Ratings.destroy({ where: {id: req.params.id}})
                res.status(200).json({
                    message: 'Комментарий удален'
                });
            }
            else{
                res.status(500).json({
                    message: 'Не удалось удалить комментарий',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось удалить комментарий',
            });
        }
    },

}

module.exports = RatingsController