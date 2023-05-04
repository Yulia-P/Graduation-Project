import React, {useState} from 'react';
import {useDispatch, } from "react-redux";
import {AiOutlineStop} from "react-icons/ai";
import {GrClose} from "react-icons/gr";
import {myUsedDiscount} from "../redux/features/alldiscount/alldiscountSlice";

export const DiscountItem = ({alldiscount}) => {
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false);

    const UseMyDiscount = () => {
        try {
            console.log(alldiscount.id)
            setModal(!modal)
        } catch (error) {
            console.log(error)
        }
    }
    const onClose = () => {
        try{
            setModal()
            dispatch(myUsedDiscount(alldiscount.id))
            window.location.reload();
        }
        catch(error){
            console.log(error)
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
        <div>
            { !modal &&(
            <div className={'flex flex-col gap-2 break-all h-15 '}>
                <div className={'text-white text-xl  w-70 '}>
                    {alldiscount.discount}
                </div>
                <div className={' text-cyan-950 opacity-95'}>
                    Баллы: {alldiscount.count_for_dnt}
                </div>
                <button
                    onClick={UseMyDiscount}
                    className='flex justify-center items-center text-xs bg-cyan-950 text-white rounded-sm py-2 px-4'>
                    Применить скидку
                </button>
            </div>)}

            { modal && (
                <div className={'overlayClasses bg-cyan-950 w-52 h-28 text-white'}>
                    <div className={'modalClasses text-white'}>
                        <div className={'flex justify-end text-white'}>
                            <button className={'flex items-center justify-center gap-2 text-white '} onClick={onClose}>
                                {/*<GrClose />*/}
                                <AiOutlineStop />
                            </button>
                        </div>
                        <div className={'mt-4 text-center'}>
                            <p className={'text-white opacity-50 text-xl'}>Промокод: </p>
                            <p className={'text-white text-xl'}>{alldiscount?.promo_code}</p>
                        </div>
                    </div>
                </div>

            )

            }
        </div>
    )
}