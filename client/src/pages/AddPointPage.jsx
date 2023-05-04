import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addPoint} from "../redux/features/point/pointSlice";


export const AddPointPage = () => {

    const dispatch = useDispatch()

    const [address, setAddress] = useState('')
    const [time_of_work, setTimeOfWork] = useState('')

    const submitHandler = async () => {
        try {
            dispatch(addPoint({ address, time_of_work}))
            console.log(address);
            console.log(time_of_work);
            setAddress('')
            setTimeOfWork('')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setAddress('')
        setTimeOfWork('')
    }

    return (
        <div>
            <button className={'flex lex-wrap justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                <Link className={'flex'} to={'/point'}>Назад</Link>
            </button>

            <form
                className='w-1/3 mx-auto py-10'
                onSubmit={(e) => e.preventDefault()}>

                <label className='text-xs text-white '>
                    Адрес:
                    <input
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Введите адресс'
                        className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950  py-1 px-2 text-xs outline-none placeholder:text-zinc-300' />
                </label>

                <label className='text-xs text-white '>
                    Время работы:
                    <input
                        type='text'
                        value={time_of_work}
                        onChange={(e) => setTimeOfWork(e.target.value)}
                        placeholder='Введите время работы'
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