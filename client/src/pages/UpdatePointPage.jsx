import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {updatePoint} from "../redux/features/point/pointSlice";
import axios from "../utils/axios";

export const UpdatePointPage = () => {

    const dispatch = useDispatch()

    const [time_of_work, setTimeOfWork] = useState('')

    const params = useParams()

    const fetchPoint = useCallback(async () => {
        const { data } = await axios.get(`/Points/${params.id}`)
        setTimeOfWork(data.time_of_work)
    }, [params.id])

    const submitHandler = () => {
        try {
            const updatedPoint = { 'time_of_work': time_of_work, 'id': params.id }
            console.log(updatedPoint)
            dispatch(updatePoint(updatedPoint))
            setTimeOfWork('')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setTimeOfWork('')
    }

    useEffect(() => {
        fetchPoint()
    }, [fetchPoint])

    return (
        <div>
            <button className={'flex justify-center items-center bg-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                <Link className={'flex'} to={'/point'}>Назад</Link>
            </button>

            <form
                className='w-1/3 mx-auto py-10'
                onSubmit={(e) => e.preventDefault()}>

                <label className='text-xs text-white'>
                    Время работы:
                    <input
                        type='text'
                        value={time_of_work}
                        onChange={(e) => setTimeOfWork(e.target.value)}
                        placeholder='Время работы'
                        className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950 py-1 px-2 text-xs outline-none placeholder:text-zinc-300'
                    />
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