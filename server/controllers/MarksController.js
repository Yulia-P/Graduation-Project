const db = require('../config/db')

const MarksController = { 
    getMarks: async(req, res, next) => {
        try {
            db.models.Marks.findAll({
                attributes: ["id", "Rubbish", "PointsOKg", "NewOKg"],
            })
            .then(expense => {res.send(JSON.stringify(expense)), console.log(JSON.stringify(expense))})
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось найти цену',
            });
        }
    },

    addMarks: async(req, res, next) => {
        try{
            db.models.Marks.create({
                Rubbish: req.body.Rubbish,
                PointsOKg: req.body.PointsOKg,
                NewOKg: req.body.NewOKg,
            })
            res.status(200).json({
                message: 'Цена добавлена'
         });
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
                Rubbish: req.body.Rubbish,
                PointsOKg: req.body.PointsOKg,
                NewOKg: req.body.NewOKg,
            }, {
                where:{ id: req.params.id}
            })
            res.json({
                success: true,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось обновить цену'
            });
        }
    },

    deleteMarks:  (req, res, next) => {
        db.models.Marks.destroy({where: {id: req.params.id}}).then(()=>{res.send();})
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Не удалось удалить цену',});}
            )
        .then((res) => {
            console.log(res);
        });
    }

}

module.exports = MarksController