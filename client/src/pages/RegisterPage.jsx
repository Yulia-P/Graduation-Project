import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {checkIsAuth, registerUser} from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const RegisterPage = () => {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()
    // error
    const { status } = useSelector((state) => state.auth)

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if(isAuth) navigate('/')
    }, [status, isAuth, navigate])
    // error

    const handleSubmit = () => {
        try{
            dispatch(registerUser({username, email, password}))
            setPassword('')
            setEmail('')
            setUserName('')
        } catch(error){
            console.log(error)
        }
    }


  return (
      <form onSubmit={e => e.preventDefault()}
            className={'w-1/4 h-60 mx-auto mt-40'}>
        <h1 className={'text-lg text-white text-center'}>Регистрация</h1>
          <label className={'text-xs text-gray-400'}>
              username:
              <input type={"text"}
                     value={username}
                     onChange={e=> setUserName(e.target.value)}
                     placeholder={'Введите имя пользователя'}
                     className={'mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'}/>
          </label>
        <label className={'text-xs text-gray-400'}>
          email:
          <input type={"email"}
                 value={email}
                 onChange={e=> setEmail(e.target.value)}
                 placeholder={'Введите почту'}
                 className={'mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'}/>
        </label>
        <label className={'text-xs text-gray-400'}>
          password:
          <input type={"password"}
                 value={password}
                 onChange={e=> setPassword(e.target.value)}
                 placeholder={'Введите пароль'}
                 className={'mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'}/>
        </label>
        <div className={'flex gap-8 justify-center mt-4'}>
          <button type={'submit'}
                  onClick={handleSubmit}
                  className={'flex justify-center items-center text-xs text-white rounded-sm bg-gray-600 py-2 px-4'}>Регистрация</button>
          <Link to={'/login'}
                className={'flex justify-center items-center text-xs text-white'}>Уже зарегистрированы?</Link>
        </div>
      </form>
  )
}
