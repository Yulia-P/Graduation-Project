import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addPoint} from "../redux/features/point/pointSlice";
import {addWeight} from "../redux/features/weight/weightSlice";

export const AddWeightPage = () => {

    const dispatch = useDispatch()

    const [rubbish, setRubbish] = useState('')
    const [weight, setWeight] = useState('')
    const [key_of_weight, setKeyOfWeight] = useState('')

    const submitHandler = async () => {
        try {
            dispatch(addWeight({ rubbish, weight, key_of_weight}))
            console.log(rubbish);
            console.log(weight);
            console.log(key_of_weight);
            setRubbish('')
            setWeight('')
            setKeyOfWeight('')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setRubbish('')
        setWeight('')
        setKeyOfWeight('')
    }

    return (
        <div>
            <button className={'flex lex-wrap justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                <Link className={'flex'} to={'/mark'}>Назад</Link>
            </button>

            <form
                className='w-1/3 mx-auto py-10'
                onSubmit={(e) => e.preventDefault()}>

                <label className='text-xs text-white '>
                    Вид отхода:
                    <input
                        type='text'
                        value={rubbish}
                        onChange={(e) => setRubbish(e.target.value)}
                        placeholder='Введите вид отхода'
                        className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950  py-1 px-2 text-xs outline-none placeholder:text-zinc-300' />
                </label>

                <label className='text-xs text-white '>
                    Вес:
                    <input
                        type='text'
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder='Введите вес'
                        className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950  py-1 px-2 text-xs outline-none placeholder:text-zinc-300' />
                </label>

                <label className='text-xs text-white '>
                    Ключ для проверки:
                    <input
                        type='text'
                        value={key_of_weight}
                        onChange={(e) => setKeyOfWeight(e.target.value)}
                        placeholder='Введите ключ'
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