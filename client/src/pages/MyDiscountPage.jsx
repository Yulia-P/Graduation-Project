import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {DiscountItem} from "../components/DiscountItem";
import {getUserM} from "../redux/features/user/userSlice";
import {myDiscount} from "../redux/features/alldiscount/alldiscountSlice";

export const MyDiscountPage = () => {
    const dispatch = useDispatch()
    const {alldiscounts} = useSelector((state) => state.alldiscount)
    const {users} = useSelector((state) => state.user)

    console.log(users)

    useEffect(() => {
        dispatch(myDiscount())
        dispatch(getUserM())
    }, [dispatch])

    if(!alldiscounts.length) {
        return(
            <div>
                <button className={'flex justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                    <Link className={'flex'} to={'/'}>Главная</Link>
                </button>
                <div className={'flex  justify-center items-center text-2xl text-white rounded-sm'}>
                    Ваши балллы:  {users.points}
                </div>
               <div className={'text-xl text-center text-white py-10'}>
                    У вас нет скидок
                </div>
            </div>
        )
    }

    return(
        <div>
            <button className={'flex justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                <Link className={'flex'} to={'/'}>Главная</Link>
            </button>

            <div className={'flex  justify-center items-center text-2xl text-white rounded-sm'}>
                Ваши балллы:  {users.points}
            </div>

            <div className={'max-w-[1200px] mx-auto py-10 '}>
                <div className={'flex justify-between gap-10'}>
                    <div className={'flex flex-wrap gap-20  '}>
                        {
                            alldiscounts?.map((alldiscount) => (
                                <DiscountItem  key={alldiscount.id} alldiscount={alldiscount}/>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}
