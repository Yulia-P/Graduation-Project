import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addDiscount} from "../redux/features/alldiscount/alldiscountSlice";


export const AddDisсountPage = () => {

    const dispatch = useDispatch()

    // const navigate = useNavigate()
    const [discount, setDiscount] = useState('')
    const [count_for_dnt, setCountForDnt] = useState('')

    const submitHandler = async () => {
        try {
            dispatch(addDiscount({ discount, count_for_dnt}))
            console.log(discount);
            console.log(count_for_dnt);
            setDiscount('')
            setCountForDnt('')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setDiscount('')
        setCountForDnt('')
        // navigate('/alldisсount')
    }

    return(
        <div>
            <button className={'flex lex-wrap justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                <Link className={'flex'} to={'/alldisсount'}>Назад</Link>
            </button>

            <form
                className='w-1/3 mx-auto py-10'
                onSubmit={(e) => e.preventDefault()}>

                <label className='text-xs text-white '>
                    Скидка:
                    <input
                        type='text'
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder='Введите скидку'
                        className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950  py-1 px-2 text-xs outline-none placeholder:text-zinc-300' />
                </label>

                <label className='text-xs text-white '>
                    Баллы:
                    <input
                        type='number'
                        value={count_for_dnt}
                        onChange={(e) => setCountForDnt(e.target.value)}
                        placeholder='Введите баллы необходимы для начисления скидки'
                        className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950  py-1 px-2 text-xs outline-none placeholder:text-zinc-300' />
                </label>

                <div className='flex gap-8 items-center justify-center mt-4'>
                    {
                        <button
                            type={'button'}
                            onClick={submitHandler}
                            className='flex justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4'>
                            Добавить
                        </button>
                    }

                    <button
                        type={'button'}
                        onClick={clearFormHandler}
                        className='flex justify-center items-center bg-pink-950 text-xs text-white rounded-sm py-2 px-4'>
                        Отменить
                    </button>
                </div>
            </form>
        </div>
    )
}
