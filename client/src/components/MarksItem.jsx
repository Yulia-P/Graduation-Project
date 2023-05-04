import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {AiFillDelete, AiTwotoneEdit} from "react-icons/ai";
import {removeMark} from "../redux/features/mark/markSlice";
import {Link} from "react-router-dom";

export const MarksItem = ({mark}) => {

    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const removeMarkHandler = () => {
        try {
            dispatch(removeMark(mark.id))
            toast('Отходы были удалены')
            window.location.reload();
            // navigate('/')
        } catch (e) {
            console.log(e)
            toast('Отход не были удалены')
        }
    }

    if(!mark){
        return(
            <div className={'text-xl text-center text-white py-10'}>
                Отходов не существует...
            </div>
        )
    }

    return (
        <div className={'flex flex-col w-48 h-10 '}>
            <div className={mark.image_link ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
                {mark.image_link && (
                    <img src={`http://localhost:8082${mark.image_link}`} className={'object-cover w-gull'}/>
                )}
            </div>

            <div className={'text-white text-xl break-all '}>
                {mark.rubbish}
            </div>
            <div className={'text-sm text-cyan-950 opacity-95'}>
                Баллы за кг - {mark.points_per_kg}
            </div>
            <div className={'text-sm text-cyan-950 opacity-95'}>
                Новая продукция за кг - {mark.new_from_kg}
            </div>

            {user?.role === "admin" && (
                <div className={'flex flex-wrap gap-3 mt-4'}>
                    <button className={'flex items-center justify-center gap-2 text-white opacity-50'}>
                        <Link to={`/${mark.id}/editmark`}>
                            <AiTwotoneEdit />
                        </Link>
                    </button>
                    <button
                        onClick={removeMarkHandler}
                        className={'flex text-white opacity-50'}>
                        <AiFillDelete />
                    </button>
                </div>
            )}
        </div>
    )
}