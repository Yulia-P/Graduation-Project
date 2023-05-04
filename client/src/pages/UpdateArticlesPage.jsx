import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { updateArticles } from '../redux/features/articles/articleSlice'
// import { checkIsAuth } from '../redux/features/auth/authSlice'
import { toast } from "react-toastify";


import axios from '../utils/axios'

export const UpdateArticlesPage = () => {
    // const isAuth = useSelector(checkIsAuth)
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const { status } = useSelector((state) => state.articles)

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image_url, setImage_url] = useState('')

    const params = useParams()

    const fetchArticles = useCallback(async () => {
        const { data } = await axios.get(`/Articles/${params.id}`)
        setTitle(data.title)
        setText(data.text)
        setImage_url(data.image_url)

    }, [params.id])

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append('image', file)
            const { data } = await axios.post('upload', formData)
            console.log(data)
            // setNewImage(data.url)
            // setOldImage('')
            setImage_url(data.url)
            console.log(image_url)

            toast(`Файл загружен`)

        } catch (e) {
            console.log(e)
            toast('Ошибка при загрузке изображения')
        }
    }

    const submitHandler = () => {
        try {
            const updatedArticles = { 'title': title, 'text': text, 'id': params.id, 'image_url': image_url }
            console.log(updatedArticles)
            dispatch(updateArticles(updatedArticles))
            setTitle('')
            setText('')
            setImage_url('')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setTitle('')
        setText('')
        setImage_url('')
    }

    useEffect(() => {
        if (status) {
            toast(status)
        }
    }, [status])

    useEffect(() => {
        fetchArticles()
    }, [fetchArticles])

    return (
        user && (
            <div>
                <button className={'flex justify-center items-center bg-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                    <Link className={'flex'} to={`${params.id}`}>Назад</Link>
                </button>

                <form
                    className='w-1/3 mx-auto py-10'
                    onSubmit={(e) => e.preventDefault()}>

                    <label className='text-gray-300 py-2 bg-cyan-950 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                        Прикрепить изорбажение:
                        <input
                            type='file'
                            className='hidden'
                            onChange={handleChangeFile}
                        />
                    </label>
                    <div className='flex object-cover py-2'>
                        {image_url && (
                            <img
                                src={`http://localhost:8082${image_url}`}
                                alt={'updated'}
                            />
                        )}
                    </div>

                    <label className='text-xs text-white'>
                        Заголовок поста:
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Заголовок'
                            className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950 py-1 px-2 text-xs outline-none placeholder:text-zinc-300'
                        />
                    </label>

                    <label className='text-xs text-white'>
                        Текст поста:
                        <textarea
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            placeholder='Текст поста'
                            className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-zinc-300'
                        />
                    </label>

                    <div className='flex gap-8 items-center justify-center mt-4'>
                        <button
                            onClick={submitHandler}
                            className='flex justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4'
                        >
                            Обновить
                        </button>

                        <button
                            onClick={clearFormHandler}
                            className='flex justify-center items-center bg-pink-950 border-pink-950 text-xs text-white rounded-sm py-2 px-4'
                        >
                            Отменить
                        </button>
                    </div>
                </form>
            </div>
        )
    )
}