import React, { useCallback, useEffect, useState } from 'react'
import Moment from "react-moment";
import { AiFillLike, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import axios from "../utils/axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {removeArticles, Likes, removeArticlesAdm} from "../redux/features/articles/articleSlice";
import { toast } from "react-toastify";
import { createComment, getComment } from "../redux/features/comment/commentSlice";
import { CommentItem } from "../components/CommentItem";

export const ArticlePage = () => {

  const [articles, setArticles] = useState(null)
  const [comment, setComment] = useState('')

  const params = useParams()

  const { user } = useSelector((state) => state.auth)
  const { comments } = useSelector((state) => state.comment)

  const { status } = useSelector((state) => state.articles)
  const { statuscom } = useSelector((state) => state.comment)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Удаление статьи
  const removeArticleHandler = () => {
    try {
      dispatch(removeArticles(params.id))
      toast('Статья была удалена')
      navigate('/')
      window.location.reload();
    } catch (e) {
      console.log(e)
    }
  }

  const removeArticleAdmHandler = () => {
    try {
      dispatch(removeArticlesAdm(params.id))
      toast('Статья была удалена')
      window.location.reload();
      // navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  //Отправка комментария
  const handleSubmit = () => {
    try {
      const article_id = params.id
      dispatch(createComment({ article_id, comment }))
      setComment('')
      // toast('Комментарий успешно добавлен')
      window.location.reload();
    } catch (e) {
      console.log(e)
    }
  }
  // Получение комментариев
  const fetchComments = useCallback(async () => {
    try {
      dispatch(getComment(params.id))
    } catch (e) {
      console.log(e)
    }
  }, [params.id, dispatch])

  // Получение статьи
  const fetchArticle = useCallback(async () => {
    const { data } = await axios.get(`/Articles/${params.id}`)
    setArticles(data)
  }, [params.id])

  const onClickLike = () => {
    if (!user) {
      window.alert("Авторизируйтесь для оценки записи");
    } else {
        dispatch(Likes(params.id));
        // window.location.reload();
    }
  };

  useEffect(() => {
    fetchComments()
    fetchArticle()
    if (status) {
      toast(status)
    }if (statuscom) {
      toast(statuscom)
    }
  }, [status, statuscom, fetchArticle, fetchArticle])

  // useEffect(() => {
  //   fetchArticle()
  // }, [fetchArticle])
  //
  // useEffect(() => {
  //   fetchComments()
  // }, [fetchComments])

  if (!articles) {
    return (
        <div>
          <button className={'flex justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
            <Link className={'flex'} to={'/'}>Назад</Link>
          </button>

          <div className={'text-xl text-center text-white py-10'}>
            Загрузка...
          </div>
        </div>
    )
  }

  return (
    <div >
      {/*Кнопка назад на главную*/}
      <button className={'flex justify-center items-center bg-cyan-950 border-cyan-950 text-xs text-white rounded-sm py-2 px-4 ml-20 mt-1'}>
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
                <button
                    className={'flex items-center justify-center gap-2 text-xs text-white opacity-50'}
                    onClick={onClickLike}
                >

                  <AiFillLike /> <span>{articles.likes}</span>
                </button>
                {/*СКОЛЬКО КОММЕНТОВ*/}
                <button className={'flex items-center justify-center gap-2 text-xs text-white opacity-50'}>
                  <AiOutlineMessage /> <span>{comments?.length || 0}</span>
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
              {user?.role === "admin" && (
                  <div className={'flex gap-3 mt-4'}>
                    <button
                        onClick={removeArticleAdmHandler}
                        className={'flex items-center justify-center gap-2 text-white opacity-50'}>
                      <AiFillDelete />
                    </button>
                  </div>
              )}
              {/*<div className={'flex gap-3 mt-4'}>{user.role}</div>*/}
              {/*<div className={'flex gap-3 mt-4'}>{articles.User.id}</div>*/}
            </div>
          </div>
          <div className={'w-1/3 p-8 bg-cyan-950 border-cyan-950 flex-col gap-2 rounded-sm'}>
            {user && (
              <form className={'flex gap-2'} onSubmit={e => e.preventDefault()}>
                {/*<input*/}
                <textarea
                    type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder='Comment'
                  className=' text-cyan-950 w-full rounded-lg bg-emerald-100 border-emerald-600 p-2 text-xs outline-none placeholder:text-cyan-900'/>
                <button
                  type={'submit'}
                  onClick={handleSubmit}
                  className={'flex justify-center items-center bg-emerald-700 text-xs text-white rounded-sm py-2 px-4'} >
                  Отправить
                </button>
              </form>
            )}
            {comments?.map((cmt) => (
                <CommentItem key={cmt.id} cmt={cmt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
