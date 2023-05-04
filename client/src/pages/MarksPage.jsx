import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {MarksItem} from "../components/MarksItem";
import {getMark} from "../redux/features/mark/markSlice";
// import {toast} from "react-toastify";


export const MarksPage = () => {
    const dispatch = useDispatch()
    const {marks} = useSelector((state) => state.mark)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMark())
    }, [dispatch])

    if(!marks.length) {
        return(
            <div className={'text-xl text-center text-white py-10'}>
                У вас нет скидок
            </div>
        )
    }

    return (
        <div>
            <div className={'flex flex-wrap'}>
                <button className={'flex justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                    <Link className={'flex'} to={'/'}>Главная</Link>
                </button>

                {user?.role === "admin" && (
                    <div className={'flex flex-wrap'}>
                        <button className={'flex lex-wrap justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                            <Link className={'flex'} to={'/newmark'}>Добавить отходы</Link>
                        </button>
                        <button className={'flex lex-wrap justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                            <Link className={'flex'} to={'/newweight'}>Добавить проверку веса</Link>
                        </button>
                    </div>
                )}
            </div>

            {/*<div className={'flex  justify-center items-center text-2xl text-white rounded-sm'}>*/}
            {/*    МОИ БАЛЛЫ:  {user?.points || 0}*/}
            {/*</div>*/}

            <div className={'max-w-[1200px] mx-auto py-10 '}>
                <div className={'flex justify-between gap-10'}>
                    <div className={'flex flex-wrap gap-20 '}>
                        {
                            marks?.map((mark, idx) => (
                                <MarksItem  key={idx} mark={mark}/>
                            ))
                        }
                    </div>
                </div>
            </div>


        </div>
    )
}
