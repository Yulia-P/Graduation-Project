const db = require('../config/db')
const { Op } = require("sequelize");

const DiscountsController = {
    getDiscounts: async(req, res, next) => {
        try {
            db.models.Discounts.findAll({
            attributes: ["id", "Discount", "PointD"],
           }) 
           .then(expense => {res.send(JSON.stringify(expense)), console.log(JSON.stringify(expense))})
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось найти скидки',
            });
        }
    },

    addDiscounts: async(req, res, next) => {
        try{
            db.models.Discounts.create({
                Discount: req.body.Discount,
                PointD: req.body.PointD,
            })
            res.status(200).json({
                message: 'Скидка добавлена'
         });
        } catch (err) {
         console.log(err);
         res.status(500).json({
            message: 'Не удалось добавить Скидку'
             });
        }
    },
    
    editDiscounts: async(req, res, next) => {
        try {
            const ArticleUp = await db.models.Discounts.update({
                Discount: req.body.Discount,
                PointD: req.body.PointD,
            }, {
                where:{ id: req.params.id}
            })
            res.json({
                success: true,
            });
        } catch (error) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось обновить скидку'
            });
        }
    },

    deleteDiscounts: async (req, res, next) => {
        db.models.Discounts.destroy({where: {id: req.params.id}}).then(()=>{res.send();})
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Не удалось удалить статью',});}
            )
        .then((res) => {
            console.log(res);
        });
    },
    getDiscountsU : async (req, res, next) => {
        const UsP = await db.models.Users.findOne({
            attributes: ["points"],
            where: {id: req.userId}
        })

        console.log("Баллы пользователя " + UsP.points);

        db.models.Discounts.findAll({
                    attributes: ["id", "Discount", "PointD"],
                    where: {PointD: { [Op.lte]: UsP.points}}
                }
            )
            .then(expense => {res.send(JSON.stringify(expense)), console.log(JSON.stringify(expense))})
    }
 }

module.exports = DiscountsController
