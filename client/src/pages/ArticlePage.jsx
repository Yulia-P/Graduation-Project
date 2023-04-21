import React, { useCallback, useEffect, useState } from 'react'
import Moment from "react-moment";
import { AiFillLike, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import axios from "../utils/axios";
// import { Link, useNavigate, useParams } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeArticles } from "../redux/features/articles/articleSlice";
import { toast } from "react-toastify";

export const ArticlePage = () => {

  const [articles, setArticles] = useState(null)
  const params = useParams()
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const removeArticleHandler = () => {
    try {
      dispatch(removeArticles(params.id))
      toast('Статья была удалена')
      // navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  const fetchArticle = useCallback(async () => {
    const { data } = await axios.get(`/Articles/${params.id}`)
    setArticles(data)
  }, [params.id])

  useEffect(() => {
    fetchArticle()
  }, [fetchArticle])

  if (!articles) {
    return (
      <div className={'text-xl text-center text-white py-10'}>
        Загрузка...
      </div>
    )
  }

  return (
    <div >
      {/*Кнопка назад на главную*/}
      <button className={'flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
        <Link className={'flex'} to={'/'}>Назад</Link>
      </button>


      <div className={'max-w-[1200px] mx-auto py-10'}>
        <div className={'flex gap-10 py-8 px-12'}>
          <div className={'w-2/3'}>

            {/*КАРТИНКА*/}
            <div className={'flex flex-col basis-1/4 flex-grow'}>
              <div className={articles.image_url ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
                {articles.image_url && (
                  <img src={`http://localhost:8082${articles.image_url}`} className={'object-cover w-full'} />
                )}
              </div>
            </div>

            <div className={'flex justify-between items-center pt-2'}>
              {/*ПОЛЬЗОВАТЕЛЬ*/}
              <div className={'text-xs text-white opacity-50'}>{articles.User.username}</div>
              {/*ДАТА СОЗДАНИЯ*/}
              <div className={'text-xs text-white opacity-50'}>
                <Moment date={articles.date_of_pub} format={'D MMM YYYY'} /></div>
            </div>

            {/*НАЗВАНИЕ*/}
            <div className={'text-white text-xl'}>{articles.title}</div>

            {/*ТЕКСТ*/}
            <p className={'text-white opacity-60 text-xs pt-4'}>{articles.text}</p>

            <div className={'flex gap-3 items-center mt-2 justify-between'}>
              <div className={'flex gap-3 mt-4'}>
                {/*КНОПКА ЛАЙКОВ*/}
                <button className={'flex items-center justify-center gap-2 text-xs text-white opacity-50'}>
                  <AiFillLike /> <span>{articles.like}</span>
                </button>
                {/*СКОЛЬКО КОММЕНТОВ*/}
                <button className={'flex items-center justify-center gap-2 text-xs text-white opacity-50'}>
                  <AiOutlineMessage /> <span>{articles.comments?.length || 0}</span>
                </button>
              </div>
              {/*КНОПКИ УДАЛЕНИЯ И ИЗМЕНЕНИЯ*/}
              {user?.id === articles.User.id && (
                <div className={'flex gap-3 mt-4'}>
                  <button className={'flex items-center justify-center gap-2 text-white opacity-50'}>
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>
                  <button
                    onClick={removeArticleHandler}
                    className={'flex items-center justify-center gap-2 text-white opacity-50'}>
                    <AiFillDelete />
                  </button>
                </div>

              )
              }
              {/*<div className={'flex gap-3 mt-4'}>{user.id}</div>*/}
              {/*<div className={'flex gap-3 mt-4'}>{articles.User.id}</div>*/}


            </div>
          </div>


          <div className={'w-1/3'}>COMMENTS</div>

        </div>
      </div>
    </div>
  )
}
