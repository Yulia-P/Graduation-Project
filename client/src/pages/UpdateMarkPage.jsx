import React, {useCallback, useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "../utils/axios";
import {toast} from "react-toastify";
import {updateMark} from "../redux/features/mark/markSlice";

export const UpdateMarkPage = () => {

    const dispatch = useDispatch()

    const [rubbish, setRubbish] = useState('')
    const [points_per_kg, setPointsPerKg] = useState('')
    const [new_from_kg, setNewFromKg] = useState('')
    const [image_link, setImageLink] = useState('')

    const params = useParams()

    const fetchMark = useCallback(async () => {
        const { data } = await axios.get(`/Marks/${params.id}`)
        setRubbish(data.rubbish)
        setPointsPerKg(data.points_per_kg)
        setNewFromKg(data.new_from_kg)
        setImageLink(data.image_link)

    }, [params.id])

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append('image', file)
            const { data } = await axios.post('upload', formData)
            console.log(data)
            setImageLink(data.url)
            console.log(image_link)

            toast(`Файл загружен`)

        } catch (e) {
            console.log(e)
            toast('Ошибка при загрузке изображения')
        }
    }

    const submitHandler = () => {
        try {
            const updatedMark = { 'rubbish': rubbish, 'points_per_kg': points_per_kg, 'id': params.id, 'new_from_kg': new_from_kg, 'image_link': image_link }
            console.log(updatedMark)
            dispatch(updateMark(updatedMark))
            setRubbish('')
            setPointsPerKg('')
            setNewFromKg('')
            setImageLink('')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setRubbish('')
        setPointsPerKg('')
        setNewFromKg('')
        setImageLink('')
    }

    useEffect(() => {
        fetchMark()
    }, [fetchMark])

    return (
        <div>
            <button className={'flex justify-center items-center bg-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                <Link className={'flex'} to={'/mark'}>Назад</Link>
            </button>

            <form
                className='w-1/3 mx-auto py-10'
                onSubmit={(e) => e.preventDefault()}>

                <label
                    className='text-gray-300 py-2 bg-cyan-950 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                    Прикрепить изорбажение:
                    <input
                        type='file'
                        className='hidden'
                        // onChange={(e) => setImage_url(e.target.files[0])}
                        onChange={handleChangeFile}
                    />
                </label>

                <div className='flex object-cover py-2'>
                    {image_link && (
                        <img src={`http://localhost:8082${image_link}`} alt={'uploaded'} />
                        // <img src={URL.createObjectURL(image_url)} alt={image_url.name} />
                    )}
                </div>

                <label className='text-xs text-white '>
                    Вид отхожа:
                    <input
                        type='text'
                        value={rubbish}
                        onChange={(e) => setRubbish(e.target.value)}
                        placeholder='Введите вид отхода'
                        className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950  py-1 px-2 text-xs outline-none placeholder:text-zinc-300' />
                </label>
                <label className='text-xs text-white '>
                    Сколько баллов начислется за 1 кг:
                    <input
                        type='text'
                        value={points_per_kg}
                        onChange={(e) => setPointsPerKg(e.target.value)}
                        placeholder='Введите баллы'
                        className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950  py-1 px-2 text-xs outline-none placeholder:text-zinc-300' />
                </label>
                <label className='text-xs text-white '>
                    Сколько новой продукции будет произведено из 1 кг сданных отходов:
                    <input
                        type='text'
                        value={new_from_kg}
                        onChange={(e) => setNewFromKg(e.target.value)}
                        placeholder='Введите вес новой продукции'
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