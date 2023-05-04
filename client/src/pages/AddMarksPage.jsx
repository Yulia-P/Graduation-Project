import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addMark} from "../redux/features/mark/markSlice";
import axios from "../utils/axios";
import {toast} from "react-toastify";

export const AddMarksPage = ( ) => {

    const dispatch = useDispatch()

    const [rubbish, setRubbish] = useState('')
    const [points_per_kg, setPointsPerKg] = useState('')
    const [new_from_kg, setNewFromKg] = useState('')
    const [image_link, setImageLink] = useState('')

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const { data } = await axios.post('upload', formData);
            console.log(data);
            setImageLink(data.url);
            toast(`Файл загружен ${image_link}`)

        } catch (e) {
            console.warn(e);
            toast('Ошибка загрузки файла')
        }
    };

    const submitHandler = async () => {
        try {
            dispatch(addMark({ rubbish, points_per_kg, new_from_kg, image_link}))
            console.log(rubbish);
            console.log(points_per_kg);
            console.log(new_from_kg);
            console.log(image_link);
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

    return(
        <div>
            <button className={'flex lex-wrap justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
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