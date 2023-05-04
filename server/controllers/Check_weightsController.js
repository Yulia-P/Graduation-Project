const db = require('../config/db')
const bcrypt = require('bcrypt')

const Check_weightsController = {

    addWeight: async (req, res) => {
        try {
            const i_key_of_weight = req.body.key_of_weight;
            const salt_for_key = '$2b$10$qNuSSupDD53DkQfO8wqpf.';
            const o_key_of_weight = await bcrypt.hash(i_key_of_weight, salt_for_key);

            const v_check_key_w = await db.models.Check_weights.findOne({
                where: { key_of_weight: o_key_of_weight }
            })

            const o_rubbish = await db.models.Marks.findOne({
                attributes: ["id"],
                where: { rubbish: req.body.rubbish }
            })

            if (v_check_key_w == null) {
                db.models.Check_weights.create({
                    rubbish_id: o_rubbish.id,
                    weight: req.body.weight,
                    key_of_weight: o_key_of_weight,
                })
            }

            res.json({
                message: 'Ключ добавлен'
            });

        } catch (error) {
            console.log(error);
            res.json({
                message: 'Не удалось добавить ключ для проверки веса'
            });
        }
    }
}
module.exports = Check_weightsController