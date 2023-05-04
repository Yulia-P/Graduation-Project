import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import {PointItem} from "../components/PointItem";
import {useDispatch, useSelector} from "react-redux";
import {getPoints} from "../redux/features/point/pointSlice";

export const PointPage = () => {
    const dispatch = useDispatch()
    const {points} = useSelector((state) => state.point)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getPoints())
    }, [dispatch])

    if(!points.length) {
        return(
            <div>
                {user?.role !== "admin" && (
                <div className={'text-xl text-center text-white py-10'}>
                    Пунктов приема не существует
                </div>
                )}
            </div>
        )
    }

    return (
        <div>
            {/*Кнопка назад на главную*/}

            <div className={'flex flex-wrap'}>
            <button className={'flex lex-wrap justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                <Link className={'flex'} to={'/'}>Главная</Link>
            </button>

                {user?.role === "admin" && (
                    <div className={'flex flex-wrap'}>
                        <button className={'flex lex-wrap justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                            <Link className={'flex'} to={'/newpoint'}>Добавить точку сбора</Link>
                        </button>
                        <button className={'flex lex-wrap justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                            <Link className={'flex'} to={'/newkey'}>Добавить секретный ключ</Link>
                        </button>
                    </div>
                )}

            </div>

            <div className={'max-w-[1200px] mx-auto py-10 '}>
                <div className={'flex justify-between gap-10'}>
                    <div className={'flex flex-wrap gap-20 '}>
                        {
                            points?.map((point) => (
                                <PointItem  key={point.id} point={point}/>
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

