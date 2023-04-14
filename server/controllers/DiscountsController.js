const db = require('../config/db')
const { Op } = require("sequelize");

const DiscountsController = {
    getDiscounts: async(req, res, next) => {
        try {
            db.models.Discounts.findAll({
            attributes: ["id", "discount", "count_for_dnt"],
           }) 
           .then(expense => {
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify(expense)), 
            console.log(JSON.stringify(expense))})
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось найти скидки',
            });
        }
    },

    addDiscounts: async(req, res, next) => {
        try{           
            const v_check_discount = await db.models.Discounts.findOne({
                where: {discount: req.body.discount}
            })

            if (v_check_discount==null){
                db.models.Discounts.create({
                    discount: req.body.discount,
                    count_for_dnt: req.body.count_for_dnt,
                })
                res.status(200).json({
                    message: 'Скидка добавлена'
             });
            }
            else{
                res.status(500).json({
                    message: 'Такая скидка уже существует'
                });
            }            
        } catch (err) {
         console.log(err);
         res.status(500).json({
            message: 'Не удалось добавить Скидку'
             });
        }
    },
    
    editDiscounts: async(req, res, next) => {
        try {
            const v_discount_up = await db.models.Discounts.update({
                discount: req.body.discount,
                count_for_dnt: req.body.count_for_dnt,
            }, {
                where:{ id: req.params.id}
            })
            res.status(200).json({
                message: 'Статья изменена'
            });
        } catch (error) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось обновить скидку'
            });
        }
    },

    deleteDiscounts: async (req, res, next) => {
        try {
            const v_check_id_discounts = await db.models.Discounts.findOne({
                where: { id: req.params.id},
            })

            if (v_check_id_discounts!=null){
                db.models.Discounts.destroy({where: {id: req.params.id}})
                res.status(200).json({
                    message: 'Скидка удалена'
                });
            }
            else{
                res.status(500).json({
                    message: 'Не удалось удалить скидку',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось удалить скидку',
            });
        }
    },

    // getDiscountsU : async (req, res, next) => {
    //     const UsP = await db.models.Users.findOne({
    //         attributes: ["points"],
    //         where: {id: req.userId}
    //     })

    //     console.log(UsP.points);

    //     if (UsP.points!=0){
    //          db.models.Discounts.findAll({
    //                 attributes: ["id", "discount", "count_for_dnt"],
    //                 where: {count_for_dnt: { [Op.lte]: UsP.points}}
    //             }
    //         )
    //         .then(expense => {res.set("Content-Type", "application/json");
    //         res.send(JSON.stringify(expense)), console.log(JSON.stringify(expense))})
    //     }
    //     else {
    //         res.status(200).json({
    //             message: 'У вас нет скидок',
    //         });
    //     }      
    // }
 }

module.exports = DiscountsController
