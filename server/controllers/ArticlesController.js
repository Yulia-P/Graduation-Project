const db = require('../config/db')
const { Op } = require('sequelize')

const ArticlesController = {
   
    getArticles: async (req, res, next) => {
        try {
            db.models.Articles.findAll({
                    attributes: ["id", "title", "text", "date_of_pub", "image_url", "like"],
                    include: [{
                        model: db.models.Users,
                        required: true,
                        attributes: ["id", "username", "avatar_url"]
                    }]
                }
            )
            .then(expense => {res.set("Content-Type", "application/json");
                res.send(JSON.stringify(expense)), 
                console.log(JSON.stringify(expense))})

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
            const resp = await  db.models.Articles.findOne({
                attrutes: ["id", "title", "text", "date_of_pub", "image_url", "like"],
                include: [{
                    model: db.models.Users,
                    required: true,
                    attributes: ["username", "avatar_url"]
                }],
                where: {id: req.params.id}}
            )
            if (resp==null){
                res.status(500).json({
                    message: 'Не удалось найти статью',
                });
            }
            else{
                res.set("Content-Type", "application/json")
                res.send(JSON.stringify(resp))
                console.log(JSON.stringify(resp))
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
                where: { title: req.body.title},
            })
            
            if (v_check_title==null){
                db.models.Articles.create({
                    author: req.userId,
                    title: req.body.title,
                    text: req.body.text, 
                    image_url: req.body.image_url,                
                    date_of_pub: Date.now(),
                })
                res.status(200).json({
                    message: 'Статья добавлена'
                });
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
                where: { id: req.params.id},
            })

            if (v_check_id_articles!=null){           
                db.models.Articles.destroy({where: {id: req.params.id}})
                res.status(200).json({
                    message: 'Статья удалена'
                });
            }
            else {
                res.status(500).json({
                    message: 'Не удалось удалить статью',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось удалить статью',
            });
        }
    },

    updateArticles: async (req, res, next) => {
        try {
            const v_check_u_title = await db.models.Articles.findOne({
                where: { title: req.body.title},
            })
            if (v_check_u_title==null){
                const v_check_u_text = await db.models.Articles.findOne({
                    where: {text: req.body.text},
                })
                if(v_check_u_text==null){
                    const ArticleUp = await db.models.Articles.update({
                        title: req.body.title,
                        text:  req.body.text,
                        date_of_pub: Date.now(),
                        image_url:  req.body.image_url
                    }, {
                        where:{ id: req.params.id}
                    })
                    res.status(200).json({
                        message: 'Статья изменена'
                    });
                }
                else {
                    res.status(500).json({
                        message: 'Статья с таким текстом уже существует'
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
                message: 'Не удалось изменить статью'
            });
        }
    },

    like: async (req, res, next) => {
        try {
            //like
            const resp = await  db.models.Articles.findOne({
                attributes: ["like"],
                where: {id: req.params.id}})

                const likes = resp.like+1;
                console.log(resp.like)
                console.log(likes)
           
            // Update
            const likeArticle = await db.models.Articles.update({
                like: likes},
                {
                    where: {id: req.params.id}})
            
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

        .then(expense => {res.send(
            JSON.stringify(expense)), 

            console.log(JSON.stringify(expense))})

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