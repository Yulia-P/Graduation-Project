import React, {useEffect, useState} from 'react'
// import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createReception} from "../redux/features/reception/receptionSlice";
import {ReactComponent as Earth} from "../image/earth.svg";


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
        <section className={'w-full flex-col xl:flex-row flex mt-6 justify-between'}>
            <div className={'relative order-2 xl:order-1 text-center w-full xl:w-2/4 xl:text-left xl:mt-40 mt-12'}>
                <h2 className={'xl:ml-36 text-2xl text-lime-900 opacity-80 mb-2'}>Введите ваши ключи:</h2>
                <form className={' bg-green-100 w-2/3 h-56 ml-36 rounded-lg'}
                      onSubmit={(e) => e.preventDefault()}>
                    <label className='flex flex-col ml-2 items-center justify-center text-xl text-lime-900 '>
                        Секретный ключ пункта сдачи
                        <input
                            type='text'
                            value={station_key}
                            onChange={(e) => setStationKey(e.target.value)}
                            placeholder='Введите секретный ключ...'
                            className='bg-green-100 border-2 border-cyan-950  mt-1 text-emerald-950 w-80  rounded-lg py-1 px-2 text-xl outline-none focus:border-emerald-700 focus:bg-emerald-700 focus:text-almost-white focus:placeholder:text-amber-50' />
                    </label>

                    <label className='flex flex-col ml-2 mt-2 items-center justify-center text-xl text-lime-900'>
                        Секретный ключ для подтверждения веса
                        <input
                            type='text'
                            value={key_of_weight}
                            onChange={(e) => setKeyOfWeight(e.target.value)}
                            placeholder='Введите проверку веса...'
                            className='bg-green-100 border-2 border-cyan-950  mt-1 text-emerald-950 w-80  rounded-lg py-1 px-2 text-xl outline-none focus:border-emerald-700 focus:bg-emerald-700 focus:text-almost-white focus:placeholder:text-amber-50' />
                    </label>

                    <div className='flex gap-8 items-center justify-center mt-4'>
                        {
                            <button
                                type={'button'}
                                onClick={submitHandler}
                                className='text-medium-gray px-5 py-2 text-white bg-black rounded-lg font-bold  mx-0 hover:bg-transparent hover:text-almost-black border-2 border-almost-black'>
                                Добавить
                            </button>
                        }
                        <button
                            type={'button'}
                            onClick={clearFormHandler}
                            className='text-medium-gray px-5 py-2 border-2 border-red-950 rounded-lg'>
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
            <div className={'hidden xl:flex xl:order-2 w-2/5 mt-10 '}>
                <Earth/>
            </div>


            {/*<div>*/}
            {/*    <form*/}
            {/*        className='w-2/6 mt-32 mx-auto py-10 bg-green-100'*/}
            {/*        onSubmit={(e) => e.preventDefault()}>*/}

                    {/*<label className='flex flex-col ml-2 items-center justify-center text-xl text-lime-900 '>*/}
                    {/*    Секретный ключ пункта сдачи:*/}
                    {/*    <input*/}
                    {/*        type='text'*/}
                    {/*        value={station_key}*/}
                    {/*        onChange={(e) => setStationKey(e.target.value)}*/}
                    {/*        placeholder='Введите секретный ключ...'*/}
                    {/*        className='mt-1 text-lime-300 w-80 rounded-lg bg-cyan-950 border-cyan-950 py-1 px-2 text-2xl outline-none placeholder:text-zinc-300' />*/}
                    {/*</label>*/}

                    {/*<label className='flex flex-col ml-2 mt-2 items-center justify-center text-xl text-lime-900'>*/}
                    {/*    Секретный ключ для подтверждения веса:*/}
                    {/*    <input*/}
                    {/*        type='text'*/}
                    {/*        value={key_of_weight}*/}
                    {/*        onChange={(e) => setKeyOfWeight(e.target.value)}*/}
                    {/*        placeholder='Введите проверку веса...'*/}
                    {/*        className='mt-1 text-lime-300 w-80 rounded-lg bg-cyan-950 border-cyan-950 py-1 px-2 text-2xl outline-none placeholder:text-zinc-300' />*/}
                    {/*</label>*/}

                    {/*<div className='flex gap-8 items-center justify-center mt-4'>*/}
                    {/*    {*/}
                    {/*        <button*/}
                    {/*            type={'button'}*/}
                    {/*            onClick={submitHandler}*/}
                    {/*            className='text-medium-gray px-5 py-2 text-white bg-black rounded-lg font-bold  mx-0 hover:bg-transparent hover:text-almost-black border-2 border-almost-black'>*/}
                    {/*            Добавить*/}
                    {/*        </button>*/}
                    {/*    }*/}

                    {/*    <button*/}
                    {/*        type={'button'}*/}
                    {/*        onClick={clearFormHandler}*/}
                    {/*        className='text-medium-gray px-5 py-2 border-2 border-red-950 rounded-lg'>*/}
                    {/*        Отменить*/}
                    {/*    </button>*/}
                    {/*</div>*/}
            {/*    </form>*/}
            {/*</div>*/}

            {/*<div className={'hidden xl:flex xl:order-2 w-2/4 mt-16 '}>*/}
            {/*    <Earth/>*/}
            {/*</div>*/}

            {/*<div className={'mx-auto py-10 ml-52 text-xl text-white'}>*/}
            {/*    <h3>{response !== undefined ? + response.payload.o_new_kg + ' кг новой продукции будет произведен(о)' : ""}</h3>*/}
            {/*    <h3>{response !== undefined ? + response.payload.o_new_points + ' балл(а/ов) вам начислено' : ""}</h3>*/}
            {/*    <h3>{response !== undefined ? + response.payload.o_new_points_user + ' ваши баллы' : ""}</h3>*/}
            {/*</div>*/}
        </section>
    )
}