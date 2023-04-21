import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import {updateArticles} from '../redux/features/articles/articleSlice'
import {checkIsAuth} from '../redux/features/auth/authSlice'
import { toast } from "react-toastify";


import axios from '../utils/axios'

export const UpdateArticlesPage = () => {
    const isAuth = useSelector(checkIsAuth)

    const dispatch = useDispatch()
    // test
    // const isAuth = () => {
    //     return window.localStorage.getItem('accessToken')
    // }
    // useEffect(() => {
    //     dispatch(setIsAuth(isAuth()))
    //     console.log('1')
    // }, [dispatch])
    // test

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    // const [oldImage, setOldImage] = useState('')
    // const [newImage, setNewImage] = useState('')
    const [image_url, setImage_url] = useState('')

    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    const params = useParams()

    const fetchArticles = useCallback(async () => {
        const { data } = await axios.get(`/Articles/${params.id}`)
        setTitle(data.title)
        setText(data.text)
        // setOldImage(data.image_url)
        setImage_url(data.image_url)

    }, [params.id])

    const handleChangeFile = async (event) => {
        try{
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

        }catch(e){
            console.log(e)
            toast('Ошибка при загрузке изображения')
        }
    }

    const submitHandler = () => {
        try {
            const updatedArticles = {'title':title, 'text':text, 'id':params.id, 'image_url':image_url}
            console.log(updatedArticles)
            dispatch(updateArticles(updatedArticles))

        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setTitle('')
        setText('')
    }

    useEffect(() => {
        fetchArticles()
    }, [fetchArticles])

    return (
        isAuth && (
        <div>
            <button className={'flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
                <Link className={'flex'} to={'/'}>Назад</Link>
            </button>

            <form
                className='w-1/3 mx-auto py-10'
                onSubmit={(e) => e.preventDefault()}
            >
                <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                    Прикрепить изорбажение:
                    <input
                        type='file'
                        className='hidden'
                        onChange={handleChangeFile
                        // (e) => {
                            // setNewImage(e.target.files[0])
                            // setOldImage('')
                        // }
                    }
                    />
                </label>
                <div className='flex object-cover py-2'>

                    {/*{oldImage && (*/}
                    {/*    <img*/}
                    {/*        src={`http://localhost:8082${oldImage}`}*/}
                    {/*        alt={oldImage.name}*/}
                    {/*    />*/}
                    {/*)}*/}
                    {/*{newImage && (*/}
                    {/*    <img*/}
                    {/*        src={`http://localhost:8082${newImage}`}*/}
                    {/*        alt={newImage.name}*/}
                    {/*    />*/}
                    {/*)}*/}

                    {image_url && (
                        <img
                            src={`http://localhost:8082${image_url}`}
                            alt={'updated'}
                        />
                    )}
                </div>

                <label className='text-xs text-white opacity-70'>
                    Заголовок поста:
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Заголовок'
                        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                    />
                </label>

                <label className='text-xs text-white opacity-70'>
                    Текст поста:
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder='Текст поста'
                        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
                    />
                </label>

                <div className='flex gap-8 items-center justify-center mt-4'>
                    <button
                        onClick={submitHandler}
                        className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                    >
                        Обновить
                    </button>

                    <button
                        onClick={clearFormHandler}
                        className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'
                    >
                        Отменить
                    </button>
                </div>
            </form>
        </div>
        )
    )
}