const db = require('../config/db')
const path = require('path')
const fs = require('fs')


const ArticlesController = {
    getArticles: async (req, res, next) => {
        try {
            db.models.Articles.findAll({
                    attributes: ["id", "Title", "Text", "DatePub", "ImageU"],
                    include: [{
                        model: db.models.Users,
                        required: true,
                        attributes: ["username", "avatarUrl"]
                    }]
                }

                 // {include:[{
                 //       model: db.models.Users,
                 //       required: true,
                 //       atributes:["username"]
                 //     }],}
            )
            .then(expense => {res.send(JSON.stringify(expense)), console.log(JSON.stringify(expense))})

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось найти статьи',
            });
        }
    },

    getArticle: async (req, res, next) => {
        try {
            const resp = await  db.models.Articles.findOne({where: {id: req.params.id}}
                // проверка не работает УЗНАТЬ что за фигня
                // ,(err, resp) => {
                //     if(err) {
                //         console.log(err);
                //         return res.status(500).json({
                //             message: 'Не удалось найти статью',
                //         });
                //     }                    
                //     if(resp===null){
                //         return res.status(404).json({
                //             message: 'Статья не найдена',
                //         });
                //     }
                // },
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


        // try {
        //     dela = await  db.models.Post.destroy({where: {id: req.params.id}}
        //         ,
        //         (err, dela) => {
        //             if(err){
        //                 console.log(err);
        //                 res.status(500).json({
        //                     message: 'Не удалось удалить статью',
        //                 });
        //             }
        //             if(dela==0) {
        //                 return res.status(404).json({
        //                     message: 'Статья не найдена',
        //                 });
        //             }
        //         },
        //         res.json({
        //             succes: true,
        //         })
        //         );    
        //         console.log(dela);        
        // } catch (error) {
        //     console.log(err);
        //     res.status(500).json({
        //         message: 'Не удалось удалить статью'
        //     });            
        // }

        // db.models.Courses.destroy({where: {courseName: req.body.courseName}}).then(()=>{res.send();})
        // .catch((err) => console.log('Error: ' + err.message))
        // .then((res) => {
        //     console.log(res);
        // });
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
    }

}
module.exports = ArticlesController