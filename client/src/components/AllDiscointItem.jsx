import React from 'react';
import {AiFillDelete, AiTwotoneEdit} from "react-icons/ai";
import {useDispatch} from "react-redux";
import {removeAllDiscount} from "../redux/features/alldiscount/alldiscountSlice";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

export const AllDiscointItem = ({alldiscount}) => {

    const dispatch = useDispatch()

    const removeAllDiscountHandler = () => {
        try {
            dispatch(removeAllDiscount(alldiscount.id))
            toast('Пункт сдачи отходов был удален')
            window.location.reload();
            // navigate('/')
        } catch (e) {
            console.log(e)
            toast('Пункт сдачи отходов не был удален')
        }
    }

    if(!alldiscount){
    return(
        <div className={'text-xl text-center text-white py-10'}>
            Скидок не существует...
        </div>
    )
}
return (
    <div className={'flex flex-col gap-2 break-all h-15 '}>
        <div className={'text-white text-xl  w-70 '}>
            {alldiscount.discount}
        </div>
        <div className={' text-cyan-950 opacity-95'}>
            Баллы: {alldiscount.count_for_dnt}
        </div>
        <div className={' text-cyan-950 opacity-95'}>
            Промокод: {alldiscount.promo_code}
        </div>
        <div className={'flex flex-wrap gap-3 mt-4'}>
        <button className={'flex items-center justify-center gap-2 text-white opacity-50'}>
            <Link to={`/${alldiscount.id}/editdiscount`}>
                <AiTwotoneEdit />
            </Link>
        </button>
        <button
            onClick={removeAllDiscountHandler}
            className={'flex items-center  text-white opacity-50'}>
            <AiFillDelete />
        </button>
        </div>


    </div>
)
}
