const db = require('../config/db')
const bcrypt = require('bcrypt')
const { Op } = require("sequelize");

const ReceptionsController = {
    
    Receptions: async( req, res, next) => {
        try {
            const v_check_is_int = req.body.weight;
            if(Number.isInteger(v_check_is_int)){
                const i_station_key = req.body.station_key;
                const salt = '$2b$10$qNuSSupDD53DkQfO8wqpf.';
                const o_station_key = await bcrypt.hash(i_station_key, salt)
            
                //Проверяем ключ
                const v_find_key = await db.models.Keys.findOne({
                    where: {secret_key: o_station_key}
                })

                //Если он существует проверяем закреплен ли он за конкретным пунктом сдачи
                if(v_find_key.used==1){
                    const v_find_key_point = await db.models.Points.findOne({
                        where: {key_id: v_find_key.id}
                    })

                    //Проверяем код для веса                    
                    if(v_find_key_point!=null){

                        const i_type_of_rubbis = await db.models.Marks.findOne({
                            attributes: ["id", "points_per_kg", "new_from_kg"],
                            where: {rubbish:req.body.type_waste}
                        })

                        const i_key_of_weight = req.body.key_of_weight;
                        const salt_for_key = '$2b$10$qNuSSupDD53DkQfO8wqpf.';
                        const o_key_of_weight = await bcrypt.hash(i_key_of_weight, salt_for_key);
            
                        const v_check_key_w = await db.models.Check_weights.findOne({
                            where: 
                            { [Op.and]: [{id_rubbish: i_type_of_rubbis.id}, { weight: req.body.weight }, { key_of_weight: o_key_of_weight}],}
                        })
                        
                        //Если все ок начинаем начислять баллы
                        if (v_check_key_w!=null){
                            // console.log(v_check_key_w)//

                            //Теперь считаем 
                            const v_weight = req.body.weight;
                            const o_new_points_per_kg = v_weight*i_type_of_rubbis.points_per_kg;
                            const o_new_kg = v_weight*i_type_of_rubbis.new_from_kg;
                        
                            // console.log("Быллы за сданое " + o_new_points_per_kg);//
                            // console.log("Новая продукция из сданого " + o_new_kg);//
                        
                            //Считаем новые баллы для пользователя
                            const i_user_points = await db.models.Users.findOne({
                                attributes: ["points"],
                                where: {id: req.userId}
                            })
                        
                            const o_new_points_user = o_new_points_per_kg+i_user_points.points
                            
                            // console.log("Баллы для пользователя " + o_new_points_user);//
                        
                            //Обновляем баллы пользователя
                            db.models.Users.update({
                                    points: o_new_points_user
                                }, {
                                        where: {id: req.userId }
                                    })

                            //Заполняем таблицу используемых скидок     
                            const v_all_discounts = await db.models.Discounts.findAll({
                                attributes: ["id"],
                                where: { count_for_dnt: {[Op.lte]: o_new_points_user}}
                            })               
                        
                            // console.log(v_all_discounts);

                            var length_all_discounts = v_all_discounts.length;

                            for (let i=0; i<length_all_discounts; i++){
                                const v_elm_arr = v_all_discounts[i].id
                                const v_check_u_d = await db.models.Used_discounts.findOne({
                                    where: 
                                { [Op.and]: [{ user_id: req.userId }, { discount_id:  v_elm_arr}],}
                                })
                                if(v_check_u_d==null){
                                    const v_new_used_disc = await db.models.Used_discounts.create({
                                        user_id: req.userId,
                                        discount_id: v_elm_arr
                                    })
                                    continue;
                                }
                                else
                                    continue;
                            }
                            
                            //Добавляем запись об этой сдаче
                            db.models.Receptions.create({
                                id_user: req.userId,
                                accrued: o_new_points_per_kg,
                                new_kg: o_new_kg,
                                weight: v_weight,
                                type_waste: i_type_of_rubbis.id,
                                station_key: v_find_key.id,
                                weight_key: v_check_key_w.id    
                            })

                            //Обновляем код пункта чтобы пользователь не мог еще раз его использовать
                            function getRandomInt(min, max) {
                                return Math.floor(Math.random() * (max - min)) + min;
                            };
                            
                            const v_count_id = await db.models.Keys.findAndCountAll({
                                attributes: ['id']
                            })
                            
                            const v_count = v_count_id.count;

                            // console.log(v_count);//

                            const v_find_used = await db.models.Keys.findOne({
                                where: {used: 0}
                            })

                            // console.log(v_find_used);//

                            if (v_find_used!=null){
                                for (let i = 1; i > 0; i++) {
                                    const v_key_id = getRandomInt(1, v_count);

                                    // console.log(v_key_id);//

                                    const v_check_used = await db.models.Keys.findOne({
                                        attributes: ["id", "used"],
                                        where: {id: v_key_id}
                                    })

                                    // console.log(v_check_used);
                                    // console.log(v_check_used.id);
                                    // console.log(v_check_used.used);
                                    // console.log(v_find_key_point.id);

                                    if (v_check_used.used == 0) {

                                        db.models.Points.update({
                                            key_id: v_check_used.id
                                        },{ where: {id: v_find_key_point.id}})
                                        
                                        db.models.Keys.update({
                                            used: 1,
                                        },{ where: {id: v_check_used.id}})

                                        break;
                                    }
                                    
                                    else{
                                        continue;
                                    }
                                }
                            }
                            else{
                                res.status(500).json({
                                    message: 'Ключ не обновлен'
                                });
                            }
                            res.status(200).json({
                                o_new_kg,
                                v_weight,
                                message: 'Ваши баллы начислены',
                            });
                        }   
                        else{
                            res.status(500).json({
                                message: 'Ключ не совпадает с введенным весом'
                            })
                        }                                                         
                    }
                    else {
                        res.status(500).json({
                            message: 'Ключ не действителен'
                        });
                    }
                }
                else{
                    res.status(500).json({
                        message: 'Ключ не действителен'
                    });
                }
            }
            else{
                res.status(500).json({
                    message: 'Вы ввели не целое число'
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось начислить баллы'
            });
        }
    },
}

module.exports = ReceptionsController


    // getReceptions: async(req, res, next) => {
    //     try {
    //         db.models.Receptions.findAll({
    //             attributes: ["id", "Address", "SecretKey"],
    //         })
    //         .then(expense => {res.set("Content-Type", "application/json");
    //             res.send(JSON.stringify(expense)), console.log(JSON.stringify(expense))})
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({
    //             message: 'Не удалось найти пункт сдачи',
    //         });
    //     }
    // }