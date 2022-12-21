const db = require('../config/db')
const bcrypt = require('bcrypt')

const PointsController = {
    getPoints: async(req, res, next) => {
        try {
            db.models.Points.findAll({
                attributes: ["id", "Address", "SecretKey"],
            })
            .then(expense => {res.set("Content-Type", "application/json");
                res.send(JSON.stringify(expense)), console.log(JSON.stringify(expense))})

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось найти пункт сдачи',
            });
        }
    },

    addPoints: async(req, res, next) => {
        try {
            const key = req.body.SecretKey;
            const salt = '$2b$10$qNuSSupDD53DkQfO8wqpf.';
            const SKey = await bcrypt.hash(key, salt)
            db.models.Points.create({
                Address: req.body.Address,
                SecretKey: SKey,
            })
            res.status(200).json({
                message: 'Пунк сдачи отходов добавлен'
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось добавить пунк сдачи отходов'
            });
        }
    },

    editPoints: async(req, res, next) => {
            const key = req.body.SecretKey;
            const salt = '$2b$10$qNuSSupDD53DkQfO8wqpf.';
            const Keys = await bcrypt.hash(key, salt)
        try {
            await db.models.Points.update({
                Address: req.body.Address,
                SecretKey: Keys,
            }, {
                where:{ id: req.params.id}
            })
            res.json({
                success: true,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось обновить пункт сдачи отходов'
            });
        }
    },

    deletePoints:  (req, res, next) => {
        db.models.Points.destroy({where: {id: req.params.id}}).then(()=>{res.send();})
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Не удалось удалить статью',});}
            )
        .then((res) => {
            console.log(res);
        });
    }

}

module.exports = PointsController