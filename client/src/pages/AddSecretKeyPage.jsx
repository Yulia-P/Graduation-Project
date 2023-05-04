import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addSecretKey} from "../redux/features/secretkey/secretkeySlice";

export const AddSecretKeyPage = () => {

    const dispatch = useDispatch()

    const [secret_key, setSecretKey] = useState('')

    const submitHandler = async () => {
        try {
            dispatch(addSecretKey({ secret_key}))
            console.log(secret_key);
            setSecretKey('')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setSecretKey('')
    }

    return(
        <div>
            <button className={'flex lex-wrap justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
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