const db = require('../config/db')
const { Op } = require("sequelize");

const DiscountsController = {
    //Admin
    getDiscounts: async (req, res) => {
        try {
            const alldiscounts = await db.models.Discounts.findAll({
                attributes: ["id", "discount", "count_for_dnt", "promo_code"],
            })

            if (!alldiscounts) {
                return res.json({ message: 'Скидок нет' })
            }

            else {
                res.json({ alldiscounts })
            }
            // .then(expense => {
            //  res.set("Content-Type", "application/json");
            //  res.send(JSON.stringify(expense)),
            //  console.log(JSON.stringify(expense))})
        } catch (error) {
            console.log(error);
            res.json({
                message: 'Не удалось найти скидки',
            });
        }
    },

    //Admin
    getDiscount: async (req, res) => {
        try {
            const alldiscounts = await db.models.Discounts.findOne({
                attributes: ["id", "discount", "count_for_dnt", "promo_code"],
                where: { id: req.params.id }
            }
            )
            if (alldiscounts == null) {
                res.json({
                    message: 'Не удалось найти скидку',
                });
            }
            else {
                res.set("Content-Type", "application/json")
                res.send(JSON.stringify(alldiscounts))
                console.log(JSON.stringify(alldiscounts))
            }

        }
        catch (error) {
            console.log(error);
            res.json({
                message: 'Не удалось найти скидку',
            });
        }
    },

    //Admin
    addDiscounts: async (req, res) => {
        try {
            const v_check_discount = await db.models.Discounts.findOne({
                where: { discount: req.body.discount }
            })

            if (v_check_discount == null) {
                db.models.Discounts.create({
                    discount: req.body.discount,
                    count_for_dnt: req.body.count_for_dnt,
                    promo_code: req.body.promo_code
                })
                res.json({
                    message: 'Скидка добавлена'
                });
            }
            else {
                res.json({
                    message: 'Такая скидка уже существует'
                });
            }
        } catch (err) {
            console.log(err);
            res.json({
                message: 'Не удалось добавить Скидку'
            });
        }
    },

    // Admin
    editDiscounts: async (req, res) => {
        try {
            const v_discount_up = await db.models.Discounts.update({
                discount: req.body.discount,
                count_for_dnt: req.body.count_for_dnt,
                promo_code: req.body.promo_code,
            }, {
                where: { id: req.params.id }
            })
            res.json({
                message: 'Скидка изменена'
            });
        } catch (error) {
            console.log(error);
            res.json({
                message: 'Не удалось обновить скидку'
            });
        }
    },

    //Admin
    deleteDiscounts: async (req, res) => {
        try {
            const v_check_id_discounts = await db.models.Discounts.findOne({
                where: { id: req.params.id },
            })

            if (v_check_id_discounts != null) {
                db.models.Discounts.destroy({ where: { id: req.params.id } })
                res.json({
                    message: 'Скидка удалена'
                });
            }
            else {
                res.json({
                    message: 'Не удалось удалить скидку',
                });
            }
        } catch (error) {
            console.log(error);
            res.json({
                message: 'Не удалось удалить скидку',
            });
        }
    },

    //User
    showMyDiscounts: async (req, res) => {
        try{

            const v_user = await db.models.Users.findOne({
                attributes: ["points"],
                where: {id: req.userId}
            })

            console.log(v_user.points);

            const alldiscounts = await db.models.Discounts.findAll({
                attributes: ["id", "discount", "count_for_dnt", "promo_code"],
                where: {count_for_dnt: { [Op.lte]: v_user.points}}
            })

            if (!alldiscounts) {
                return res.json({ message: 'Скидок нет' })
            }

            res.json({ alldiscounts })
        }
        catch (error) {
            console.log(error);
        }
    },

    //User
    usedMyDiscounts: async (req, res) => {
        try {
            const v_user = await db.models.Users.findOne({
                attributes: ["points"],
                where: {id: req.userId}
            })

            console.log(v_user.points);

            const i_discounts = await db.models.Discounts.findOne({
                attributes: ["id", "discount", "count_for_dnt", "promo_code"],
                where: {id: req.params.id}
            })

            console.log(i_discounts.count_for_dnt);

            const o_new_points = v_user.points - i_discounts.count_for_dnt

            console.log(o_new_points);

            await db.models.Users.update({
                points: o_new_points
            }, {where: {id: req.userId}})

            res.json({
                o_new_points,
                message: 'Скидка использована'
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = DiscountsController
