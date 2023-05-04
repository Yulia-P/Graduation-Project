import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getAllDiscounts} from "../redux/features/alldiscount/alldiscountSlice";
import {Link} from "react-router-dom";
import {AllDiscointItem} from "../components/AllDiscointItem";

export const AllDiscointPage = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const {alldiscounts} = useSelector((state) => state.alldiscount)

    useEffect(() => {
        dispatch(getAllDiscounts())
    }, [dispatch])

    if(!alldiscounts) {
        return(
            <div className={'text-xl text-center text-white py-10'}>
               Скидок нет
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
                            <Link className={'flex'} to={'/newdisсount'}>Добавить скидку</Link>
                        </button>
                    </div>
                )}
            </div>
    <div className={'max-w-[1200px] mx-auto py-10 '}>
        <div className={'flex justify-between gap-10'}>
            <div className={'flex flex-wrap gap-20  '}>
                {
                    alldiscounts?.map((alldiscount) => (
                        <AllDiscointItem  key={alldiscount.id} alldiscount={alldiscount}/>
                            ))
                        }
            </div>
        </div>
    </div>
        </div>
    )
}