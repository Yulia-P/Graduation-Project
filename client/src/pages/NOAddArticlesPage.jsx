import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createArticles } from '../redux/features/articles/articleSlice'
import axios from "../utils/axios";
import { toast } from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
// import { checkIsAuth } from '../redux/features/auth/authSlice'


export const NOAddArticlesPage = () => {
    const { user } = useSelector((state) => state.auth)
    // const navigate = useNavigate()

    const { status } = useSelector((state) => state.articles)

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image_url, setImage_url] = useState('')

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const { data } = await axios.post('upload', formData);
            console.log(data);
            setImage_url(data.url);
            toast(`Файл загружен ${image_url}`)

        } catch (e) {
            console.warn(e);
            toast('Ошибка загрузки файла')
        }
    };

    useEffect(() => {
        if (status) {
            toast(status)
        }
    }, [status])

    const submitHandler = () => {
        try {
            dispatch(createArticles({ title, text, image_url }))
            console.log(title);
            console.log(text);
            console.log(image_url);
            setText('')
            setTitle('')
            setImage_url('')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setText('')
        setTitle('')
        setImage_url('')
        // navigate('/')
    }

    return (
        user && (
            <div>
                <button className={'flex justify-center items-center bg-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                    <Link className={'flex'} to={'/'}>Главная</Link>
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
                        {image_url && (
                            <img src={`http://localhost:8082${image_url}`} alt={'uploaded'} />
                            // <img src={URL.createObjectURL(image_url)} alt={image_url.name} />
                        )}
                    </div>

                    <label className='text-xs text-white '>
                        Заголовок поста:
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Заголовок'
                            className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950  py-1 px-2 text-xs outline-none placeholder:text-zinc-300' />
                    </label>

                    <label className='text-xs text-white '>
                        Текст поста:
                        <textarea
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            placeholder='Текст поста'
                            className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950  py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-zinc-300'
                        />
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
    )
}