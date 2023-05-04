const db = require('../config/db')

const MarksController = {

    getMarks: async (req, res) => {
        try {
            const marks = await db.models.Marks.findAll({
                attributes: ["id", "rubbish", "points_per_kg", "new_from_kg", "image_link"],
            })
            if (!marks) {
                return res.json({ message: "Отходов нет" })
            }
            else {
                res.json({ marks })
            }
            // .then(expense => {
            //     res.set("Content-Type", "application/json");
            //     res.send(JSON.stringify(expense)),
            //     console.log(JSON.stringify(expense))})
        } catch (error) {
            console.log(error);
            res.json({
                message: 'Не удалось найти отходы',
            });
        }
    },

    getMark: async (req, res) => {
        try {
            const marks = await db.models.Marks.findOne({
                attributes: ["id", "rubbish", "points_per_kg", "new_from_kg", "image_link"],
                where: { id: req.params.id }
            })

            if (marks == null) {
                res.json({
                    message: 'Не удалось найти скидку',
                });
            }
            else {
                res.set("Content-Type", "application/json")
                res.send(JSON.stringify(marks))
                console.log(JSON.stringify(marks))
            }
        }
        catch (error) {
            console.log(error);
            res.json({
                message: 'Не удалось найти отходы',
            });
        }
    },

    addMarks: async (req, res) => {
        try {
            const v_check_marks = await db.models.Marks.findOne({
                where: { rubbish: req.body.rubbish },
            })

            if (v_check_marks == null) {
                await db.models.Marks.create({
                    rubbish: req.body.rubbish,
                    points_per_kg: req.body.points_per_kg,
                    new_from_kg: req.body.new_from_kg,
                    image_link: req.body.image_link,
                })
                res.json({
                    message: 'Цена добавлена'
                });
            }
            else {
                res.json({
                    message: 'Такой вид отхожов уже есть, введите новый',
                });
            }
        } catch (err) {
            console.log(err);
            res.json({
                message: 'Не удалось добавить отходы'
            });
        }
    },

    editMarks: async (req, res) => {
        try {
            await db.models.Marks.update({
                points_per_kg: req.body.points_per_kg,
                new_from_kg: req.body.new_from_kg,
                image_link: req.body.image_link,
            }, { where: { id: req.params.id } })

            res.json({
                message: 'Цена обновлена'
            });
        } catch (error) {
            console.log(error);
            res.json({
                message: 'Не удалось обновить отходы'
            });
        }
    },

    deleteMarks: async (req, res) => {
        try {
            const v_check_id_marks = await db.models.Marks.findOne({
                where: { id: req.params.id },
            })

            if (v_check_id_marks != null) {
                await db.models.Marks.destroy({ where: { id: req.params.id } })
                res.json({
                    message: 'Цена удалена'
                });
            }
            else {
                res.json({
                    message: 'Не удалось удалить отходы',
                });
            }

        } catch (error) {
            console.log(error);
            res.json({
                message: 'Не удалось удалить отходы',
            });

        }
    }
}

module.exports = MarksController