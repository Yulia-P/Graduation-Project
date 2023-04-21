const db = require('../config/db')
// const { Op } = require('sequelize')
// const { dirname } = require('path')
// const path = require('path')
// const { fileURLToPath } = require('url')

const ArticlesController = {

    getArticles: async (req, res, next) => {
        try {
           const article = await db.models.Articles.findAll({
                attributes: ["id", "title", "text", "date_of_pub", "image_url", "like"],
                include: [{
                    model: db.models.Users,
                    required: true,
                    attributes: ["id", "username", "avatar_url"]
                }]
            }
            )
            if(!article){
                return res.json({message: 'Статей нет'})
            }
            else{
                res.json({article})
            }
                // .then(expense => {
                //     res.set("Content-Type", "application/json");
                //     res.send(JSON.stringify(expense)),
                //         console.log(JSON.stringify(expense))
                // })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось найти статьи',
            });
        }
    },

    // getArticlesRating: async (req, res, next) => {
    //     try {
    //         db.models.Ratings.findAll({
    //             attributes: ["id", "Comment", "Item", "Commentator"],
    //             include: [{
    //                 model: db.models.Articles,
    //                 required: true,
    //                 attributes: ["id", "title", "text", "date_of_pub", "image_url", "like"],
    //                 include: [{
    //                     model: db.models.Users,
    //                     required: true,
    //                     attributes: ["id", "username", "avatar_url"]
    //                 }]
    //             }]
    //         })
    //         .then(expense => {res.send(JSON.stringify(expense)), console.log(JSON.stringify(expense))})
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({
    //             message: 'Не удалось найти статьи',
    //         });
    //     }
    // },

    getArticle: async (req, res, next) => {
        try {
            const article = await db.models.Articles.findOne({
                attributes: ["id", "title", "text", "date_of_pub", "image_url", "like"],
                include: [{
                    model: db.models.Users,
                    required: true,
                    attributes: ["id", "username", "avatar_url"]
                }],
                where: { id: req.params.id }
            }
            )
            if (article == null) {
                res.status(500).json({
                    message: 'Не удалось найти статью',
                });
            }
            else {
                res.set("Content-Type", "application/json")
                res.send(JSON.stringify(article))
                console.log(JSON.stringify(article))
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось найти статью',
            });
        }
    },

    addArticles: async (req, res, next) => {
        try {
            const v_check_title = await db.models.Articles.findOne({
                where: { title: req.body.title },
            })

            const v_b_image_url = req.body.image_url;
            if (v_check_title == null) {
                if (v_b_image_url!=undefined) {
                    db.models.Articles.create({
                        author: req.userId,
                        title: req.body.title,
                        text: req.body.text,
                        image_url: req.body.image_url,
                        date_of_pub: Date.now(),
                    })
                    res.status(200).json({
                        message: 'Статья добавлена с картинкой'
                    });
                }
                else {
                    db.models.Articles.create({
                        author: req.userId,
                        author: 7,
                        title: req.body.title,
                        text: req.body.text,
                        image_url: '',
                        date_of_pub: Date.now(),
                    })
                    res.status(200).json({
                        message: 'Статья добавлена без картинки'
                    });
                }
            }
            else {
                res.status(500).json({
                    message: 'Статья с таким названием уже существует'
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось добавить статью'
            });
        }
    },

    deleteArticles: async (req, res, next) => {
        try {
            const v_check_id_articles = await db.models.Articles.findOne({
                where: { id: req.params.id },
            })

            if (v_check_id_articles != null) {
                const article = db.models.Articles.destroy({ where: { id: req.params.id } })
                res.
                // status(200).
                json({
                    message: 'Статья удалена'
                });
            }
            else {
                res.
                // status(500).
                json({
                    message: 'Не удалось удалить статью',
                });
            }
        } catch (error) {
            console.log(error);
            res.
            // status(500).
            json({
                message: 'Не удалось удалить статью',
            });
        }
    },

    updateArticles: async (req, res, next) => {
        try {
            const v_check_u_title = await db.models.Articles.findOne({
                where: { title: req.body.title },
            })
            const v_u_image_url = req.body.image_url
                if (v_u_image_url == undefined) {
                    const article = await db.models.Articles.update({
                        title: req.body.title,
                        text: req.body.text,
                        date_of_pub: Date.now(),
                        image_url: ''
                    }, {
                        where: {id: req.params.id}
                    })
                    res.status(200).json({
                        article,
                        message: 'Статья изменена'
                    });
                }
                else {
                    const article = await db.models.Articles.update({
                        title: req.body.title,
                        text: req.body.text,
                        date_of_pub: Date.now(),
                        image_url: req.body.image_url
                    }, {
                        where: {id: req.params.id}
                    })
                    res.status(200).json({
                        article,
                        message: 'Статья изменена'
                    });
                }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось изменить статью'
            });
        }
    },

    like: async (req, res, next) => {
        try {
            //like
            const resp = await db.models.Articles.findOne({
                attributes: ["like"],
                where: { id: req.params.id }
            })

            const likes = resp.like + 1;
            console.log(resp.like)
            console.log(likes)

            // Update
            const likeArticle = await db.models.Articles.update({
                like: likes
            },
                {
                    where: { id: req.params.id }
                })

            console.log(likeArticle);

            // All Articles ?? ОСТАВЛЯТЬ ??
            db.models.Articles.findAll({
                attributes: ["id", "title", "text", "date_of_pub", "image_url", "like"],
                include: [{
                    model: db.models.Users,
                    required: true,
                    attributes: ["id", "username", "avatar_url"]
                }]
            }
            )

                .then(expense => {
                    res.send(
                        JSON.stringify(expense)),

                        console.log(JSON.stringify(expense))
                })

            // res.json({
            //     success: true,
            // });


        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось найти статью',
            });
        }
    },

}
module.exports = ArticlesController