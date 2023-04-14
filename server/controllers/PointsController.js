const db = require('../config/db')
const bcrypt = require('bcrypt')

const PointsController = {
    getPoints: async(req, res, next) => {
        try {
            db.models.Points.findAll({
                attributes: ["id", "address", "time_of_work", "key_id", "admin_id"],
            })
            .then(expense => {
                res.set("Content-Type", "application/json");
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
            const v_check_address = await db.models.Points.findOne({
                where: {address: req.body.address}
            })

            if (v_check_address==null){
                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
                };
                
                const v_count_id = await db.models.Keys.findAndCountAll({
                    attributes: ['id']
                })
                
                const v_count = v_count_id.count;

                const v_find_used = await db.models.Keys.findOne({
                    where: {used: 0}
                })

                if (v_find_used!=null){
                
                for (let i = 1; i > 0; i++) {
                    const v_key_id = getRandomInt(1, v_count);
                    // console.log(v_key_id);
                    const v_check_used = await db.models.Keys.findOne({
                        where: {id: v_key_id}
                    })
                    
                    const o_check_used = v_check_used.used;
                    
                    if (o_check_used == 0) {
                        db.models.Points.create({
                            address: req.body.address,
                            time_of_work: req.body.time_of_work,
                            key_id: v_key_id,
                            admin_id: req.userId,
                        })
                        
                        db.models.Keys.update({
                            used: 1,
                        },{
                            where: {id: v_key_id}
                        })
                        break;
                    }
                    else{
                        continue;
                    }
                }                
                res.status(200).json({
                    message: 'Пунк сдачи отходов добавлен'
                });
            }
                else {
                    res.status(500).json({
                        message: 'Пунк сдачи отходов не может быть добавлен, нет свободных ключей'
                    });
                }
            }
            else{
                res.status(500).json({
                    message: 'Адрес уже используется, введите новый адресс'
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось добавить пунк сдачи отходов'
            });
        }
    },

    editPoints: async(req,res, next) => {
        try{
            const v_point_id = await db.models.Points.findOne({
                where: {id: req.params.id}
            })

            if(v_point_id!=null){
                const o_points_up = await db.models.Points.update({
                    time_of_work: req.body.time_of_work,}, 
                    {where:{ id: req.params.id}})

                    res.status(200).json({
                        message: 'Время работы изменено'
                    });                
            } else{
                res.status(500).json({
                    message: 'Точки сбора отходов не сущестует'
                });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось изменить точку сбора отходов'
            });
        }
    },

    editPointsKey: async(req, res, next) => {
        try {
            const v_point_key_id = await db.models.Points.findOne({
                atridutes: ["key_id"],
                where: {id: req.params.id}
            })
            
            const v_last_id_k = await db.models.Keys.findOne({
                order: [['id', 'DESC']],
              });

              const o_new_id_k = v_last_id_k.id+1;



            // console.log(v_point_key_id.key_id);
            
            const v_key = req.body.secret_key;
            const i_sk_salt = '$2b$10$qNuSSupDD53DkQfO8wqpf.';
            const o_secret_key = await bcrypt.hash(v_key, i_sk_salt);
            const v_old_key = await db.models.Keys.findOne({
                attrutes: ["secret_key"],
                where: {secret_key: o_secret_key}
            });

            // console.log(v_old_key.id);
            
            if (v_old_key==null){
                const new_record_keys = await db.models.Keys.create({
                    id: o_new_id_k,
                    secret_key: o_secret_key,
                    used: 1,
                })
                
                // console.log(new_record_keys.toJSON())
                // console.log(new_record_keys.null);
                
                db.models.Points.update({
                    key_id: new_record_keys.null

                }, {
                    where: {id: req.params.id}
                })

                res.status(200).json({
                    message: 'Секретный ключ обновлен'
                });
            }
            else{
                res.status(500).json({
                    message: 'Такой код уже используется исправьте его'
                })}
            } 



        catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось обновить пункт сдачи отходов'
            });
        }
    },

    deletePoints: async (req, res, next) => {
        try {
            const v_check_id_points = await db.models.Points.findOne({
                where: { id: req.params.id},
            })
            
            if(v_check_id_points!=null){
                db.models.Points.destroy({where: {id: req.params.id}})
                res.status(200).json({
                    message: 'Точка сбора отходов удалена'
                });
            }
            else {
                res.status(500).json({
                    message: 'Не удалось удалить точка сбора отходов',
                });
            }
        } catch (error) {           
                console.log(error);
                res.status(500).json({
                    message: 'Не удалось удалить точку сбора отходов',
                });
        }
    }
}

module.exports = PointsController