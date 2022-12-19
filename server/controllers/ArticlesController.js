const db = require('../config/db')

const ArticlesController = {
    getArticles: async (req, res, next) => {
        try {
            db.models.Articles.findAll({
                    attributes: ["id", "Title", "Text", "DatePub", "ImageU", "Like"],
                    include: [{
                        model: db.models.Users,
                        required: true,
                        attributes: ["id", "username", "avatarUrl"]
                    }]
                }
            )
            .then(expense => {res.send(JSON.stringify(expense)), console.log(JSON.stringify(expense))})

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
    //                 attributes: ["id", "Title", "Text", "DatePub", "ImageU", "Like"],
    //                 include: [{
    //                     model: db.models.Users,
    //                     required: true,
    //                     attributes: ["id", "username", "avatarUrl"]
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
                attrutes: ["id", "Title", "Text", "DatePub", "ImageU", "Like"],
                include: [{
                    model: db.models.Users,
                    required: true,
                    attributes: ["username", "avatarUrl"]
                }],
                where: {id: req.params.id}}
            )
                console.log(resp)
                res.send(JSON.stringify(resp))
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось найти статью',
            });
        }
    },

    addArticles: async (req, res, next) => {
        try {            
            db.models.Articles.create({
                Author: req.userId,
                Title: req.body.Title,
                Text: req.body.Text, 
                ImageU: req.body.ImageU,                
                DatePub: Date.now(),
            })    
            res.status(200).json({
                message: 'Статья добавлена'
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось добавить статью'
            });
        }
    },

    deleteArticles:  (req, res, next) => {
        db.models.Articles.destroy({where: {id: req.params.id}}).then(()=>{res.send();})
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Не удалось удалить статью',});}
            )
        .then((res) => {
            console.log(res);
        });
    },

    updateArticles: async (req, res, next) => {
        try {
            const ArticleUp = await db.models.Articles.update({
                Title: req.body.Title,
                Text:  req.body.Text,
                DatePub: Date.now(),
                ImageU:  req.body.ImageU
            }, {
                where:{ id: req.params.id}
            })
            res.json({
                success: true,
            });
            // .then((res) => {console.log(res);
            
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось обновить статью'
            });
        }
    },

    Like: async (req, res, next) => {
        try {
            //Like
            const resp = await  db.models.Articles.findOne({
                attributes: ["Like"],
                where: {id: req.params.id}})

                const likes = resp.Like+1;
                console.log(resp.Like)
                console.log(likes)
           
            // Update
            const LikeArticle = await db.models.Articles.update({
                Like: likes},
                {
                    where: {id: req.params.id}})
            
            console.log(LikeArticle);

            // All Articles
            db.models.Articles.findAll({
                attributes: ["id", "Title", "Text", "DatePub", "ImageU", "Like"],
                include: [{
                    model: db.models.Users,
                    required: true,
                    attributes: ["id", "username", "avatarUrl"]
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