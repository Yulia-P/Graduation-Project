const db = require('../config/db')
const { Op } = require("sequelize");


const Used_discountsController ={
    
    usedDiscounts: async(req, res, next) => {
        try {
            const i_id_user = req.params.id
            
            console.log(i_id_user)

            const i_my_discount = await db.models.Discounts.findOne({
                attributes: ["count_for_dnt"],
                where: {id: i_id_user},
            })

            console.log(i_my_discount.count_for_dnt)

            const v_old_points = await db.models.Users.findOne({
                attributes: ["points"],
                where: {id: req.userId}
            })

            console.log(v_old_points.points)

            const v_new_points = v_old_points.points - i_my_discount.count_for_dnt

            console.log(v_new_points)

            db.models.Users.update({
                points: v_new_points
            },{ where: {id: req.userId}})

            const v_change_disc = db.models.Used_discounts.update({
                used: 1
            },{ where: {discount_id: i_id_user}}) 

            console.log(v_change_disc)
            
            res.status(200).json({
                message: 'Скидка использована'
            });

        } catch (error) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось использовать скидку'
            });
        }

    },

    showMyDiscounts: async(req, res, next) => {
        try {
            db.models.Used_discounts.findAll({
                attributes: ["discount_id"],
                include:[{
                    model: db.models.Discounts,
                    required: true,
                    attributes: ["id", "discount", "count_for_dnt"]
                }],
                where:
                { [Op.and]: [{ user_id: req.userId }, { used:  {[Op.ne]: 1}}],
            }  
        })
        .then(expense => {res.set("Content-Type", "application/json");
        res.send(JSON.stringify(expense)), 
        console.log(JSON.stringify(expense))})           
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось загрузить скидки'
            });
            
        }

    }

}
module.exports = Used_discountsController
