const db = require('../config/db')
const bcrypt = require('bcrypt')

const ReceptionsController = {
    Receptions: async( req, res, next) => {
        try {
            const StationKey = req.body.StationKey;
            const salt = '$2b$10$qNuSSupDD53DkQfO8wqpf.';
            const StKey = await bcrypt.hash(StationKey, salt)
            
            const SecKey = await db.models.Points.findOne({
                attributes: ["SecretKey"],
                where: {SecretKey: StKey}
            })
            console.log("Ключ из таблицы "+SecKey.SecretKey);
            console.log("Ключ который ввел пользователь "+StKey);
            
            const Rub = req.body.TypeWaste
            const Mark = await db.models.Marks.findOne({
                attributes: ["PointsOKg", "NewOKg"],
                where: {Rubbish: Rub}
            })
            
            console.log(Mark);
            
            // Начисляем баллы и считаем сколько новой продукци будет сделано из сданных отходов
            const WeightReq = req.body.Weight;
            const AccruedN = WeightReq*Mark.PointsOKg;
            const NewKgR = WeightReq*Mark.NewOKg;
            
            console.log("Быллы за сданое "+AccruedN);
            console.log("Новая продукция из сданого "+NewKgR);
            
            const Upoint = await db.models.Users.findOne({
                attributes: ["points"],
                where: {id: req.userId}
            })
            
            const NewPointU = AccruedN+Upoint.points
            console.log("Баллы для пользователя "+NewPointU);
            
            db.models.Users.update({
                points: NewPointU
            }, {
                where: {id: req.userId }
            })
            
            db.models.Receptions.create({
                idUser: req.userId,
                Accrued: AccruedN,
                NewKg: NewKgR,
                Weight: WeightReq,
                TypeWaste: Rub,
                StationKey: StKey
            })
            
            res.status(200).json({
                message: 'Ваши быллы начислены',
            });
        
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось начислить баллы'
            });
        }
    }
}

module.exports = ReceptionsController