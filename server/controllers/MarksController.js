const db = require('../config/db')

const MarksController = { 
    
    getMarks: async(req, res, next) => {
        try {
            db.models.Marks.findAll({
                attributes: ["id", "rubbish", "points_per_kg", "new_from_kg"],
            })
            .then(expense => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(expense)), 
                console.log(JSON.stringify(expense))})
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось найти цену',
            });
        }
    },

    addMarks: async(req, res, next) => {
        try{
            const v_check_marks = await db.models.Marks.findOne({
                where: { rubbish: req.body.rubbish},
            })

            if(v_check_marks==null){
                db.models.Marks.create({
                    rubbish: req.body.rubbish,
                    points_per_kg: req.body.points_per_kg,
                    new_from_kg: req.body.new_from_kg,
                })
                res.status(200).json({
                    message: 'Цена добавлена'
             });
            }
            else{
                res.status(500).json({
                    message: 'Такой вид отхожов уже есть, введите новый',
                });
            }           
        } catch (err) {
         console.log(err);
         res.status(500).json({
            message: 'Не удалось добавить цену'
             });
        }
    },

    editMarks: async(req, res, next) => {
        try {
            await db.models.Marks.update({
                points_per_kg: req.body.points_per_kg,
                new_from_kg: req.body.new_from_kg,
            }, { where:{ id: req.params.id} })
            
            res.status(200).json({
                message: 'Цена обновлена'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось обновить цену'
            });
        }
    },

    deleteMarks: async (req, res, next) => {
        try {
            const v_check_id_marks = await db.models.Marks.findOne({
                where: { id: req.params.id},
            })

            if (v_check_id_marks!=null){
                db.models.Marks.destroy({where: {id: req.params.id}})
                res.status(200).json({
                    message: 'Цена удалена'
                });
            }
            else {
                res.status(500).json({
                    message: 'Не удалось удалить цену',
                });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось удалить цену',
            });
            
        }
    }

}

module.exports = MarksController