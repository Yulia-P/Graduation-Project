import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createReception} from "../redux/features/reception/receptionSlice";

export const ReceptionPage = () => {

    const dispatch = useDispatch()

    const [response, setResponse] = useState();

    const [weight, setWeight] = useState('')
    const [type_waste, setType_waste] = useState('')
    const [station_key, setStationKey] = useState('')
    const [key_of_weight, setKeyOfWeight] = useState('')

    useEffect(() => {
        console.log(response);
    }, [response]);

    const submitHandler = async () => {
        try {
            setResponse(await dispatch(createReception({ weight, type_waste, station_key, key_of_weight  })))
            console.log(weight);
            console.log(type_waste);
            console.log(station_key);
            console.log(key_of_weight);
            setWeight('')
            setType_waste('')
            setStationKey('')
            setKeyOfWeight('')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setWeight('')
        setType_waste('')
        setStationKey('')
        setKeyOfWeight('')
    }

    return (
        <div>
            <button className={'flex justify-center items-center bg-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                <Link className={'flex'} to={'/'}>Главная</Link>
            </button>

            <form
                className='w-1/3 mx-auto py-10'
                onSubmit={(e) => e.preventDefault()}>

                <label className='text-xs text-white '>
                    Секретный ключ пункта сдачи:
                    <input
                        type='text'
                        value={station_key}
                        onChange={(e) => setStationKey(e.target.value)}
                        placeholder='Введите секретный ключ пункта сдачи'
                        className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950  py-1 px-2 text-xs outline-none placeholder:text-zinc-300' />
                </label>

                <label className='text-xs text-white '>
                    Секретный ключ для подтверждения веса:
                    <input
                        type='text'
                        value={key_of_weight}
                        onChange={(e) => setKeyOfWeight(e.target.value)}
                        placeholder='Введите секретный ключ для подтверждения веса'
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
            <div className={'mx-auto py-10 ml-52 text-xl text-white'}>
                <h3>{response !== undefined ? + response.payload.o_new_kg + ' кг новой продукции будет произведен(о)' : ""}</h3>
                <h3>{response !== undefined ? + response.payload.o_new_points + ' балл(а/ов) вам начислено' : ""}</h3>
                <h3>{response !== undefined ? + response.payload.o_new_points_user + ' ваши баллы' : ""}</h3>
            </div>
        </div>
    )
}