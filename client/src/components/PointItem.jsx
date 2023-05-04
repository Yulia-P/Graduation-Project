import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AiFillDelete, AiTwotoneEdit, AiOutlineBarcode} from "react-icons/ai";
import { toast } from "react-toastify";
import {removePoint} from "../redux/features/point/pointSlice";
import {Link} from "react-router-dom";

export const PointItem = ({point}) => {
    const { user } = useSelector((state) => state.auth)


    const dispatch = useDispatch()

    const removePointHandler = () => {
        try {
            dispatch(removePoint(point.id))
            toast('Пункт сдачи отходов был удален')
            window.location.reload();
            // navigate('/')
        } catch (e) {
            console.log(e)
            toast('Пункт сдачи отходов не был удален')
        }
    }

    if(!point){
        return(
            <div className={'text-xl text-center text-white py-10'}>
                Пунктов приема не существует...
            </div>
        )
    }
    return (
        <div className={'flex flex-col w-60 h-10  '}>
            {user?.role === "admin" && (
                <div className={'flex flex-wrap gap-3 mt-4'}>
                    <button className={'flex items-center justify-center gap-2 text-white opacity-50'}>
                        <Link to={`/${point.id}/editpoint`}>
                            <AiTwotoneEdit />
                        </Link>
                    </button>
                    <button className={'flex items-center justify-center gap-2 text-white opacity-50'}>
                        <Link to={`/${point.id}/editpointk`}>
                            <AiOutlineBarcode />
                        </Link>
                    </button>
                    <button
                        onClick={removePointHandler}
                        className={'flex items-center justify-center gap-2 text-white opacity-50'}>
                        <AiFillDelete />
                    </button>
                </div>
            )}
            <div className={'text-white text-xl break-all '}>
                {point.address}
            </div>
            <div className={' text-cyan-950 opacity-95'}>
                {point.time_of_work}
            </div>
        </div>
    )
}

