import React, {useState} from 'react'
import {updatePointK} from "../redux/features/point/pointSlice";
import {useDispatch} from "react-redux";
import {Link, useParams} from "react-router-dom";

export const UpdatePointKeyPage = () => {

    const dispatch = useDispatch()

    const [secret_key, setSecretKey] = useState('')

    const params = useParams()

    const submitHandler = () => {
        try {
            const updatedPointK = { 'secret_key': secret_key, 'id': params.id }
            console.log(updatedPointK)
            dispatch(updatePointK(updatedPointK))
            setSecretKey('')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setSecretKey('')
    }

    return (
        <div>
            <button className={'flex justify-center items-center bg-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                <Link className={'flex'} to={'/point'}>Назад</Link>
            </button>

            <form
                className='w-1/3 mx-auto py-10'
                onSubmit={(e) => e.preventDefault()}>

                <label className='text-xs text-white '>
                    Секретный ключ:
                    <input
                        type='text'
                        value={secret_key}
                        onChange={(e) => setSecretKey(e.target.value)}
                        placeholder='Введите секретный ключ'
                        className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950  py-1 px-2 text-xs outline-none placeholder:text-zinc-300' />
                </label>

                <div className='flex gap-8 items-center justify-center mt-4'>
                    {
                        <button
                            type={'button'}
                            onClick={submitHandler}
                            className='flex justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4'>
                            Изменить
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
