import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/features/auth/authSlice'
// import { checkIsAuth } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { status } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)


    // const isAuth = useSelector(checkIsAuth)

    useEffect(() => {
        if (status) toast(status)
        if (user) navigate('/')
    }, [status, user, navigate])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ email, password }))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/4 h-60 mx-auto mt-40'>
            <h1 className='text-lg text-white text-center'>Авторизация</h1>
            <label className='text-xs text-white'>
                email:
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950 py-1 px-2 text-xs outline-none placeholder:text-zinc-300'
                />
            </label>

            <label className='text-xs text-white'>
                password:
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    className='mt-1 text-lime-300 w-full rounded-lg bg-cyan-950 border-cyan-950 py-1 px-2 text-xs outline-none placeholder:text-zinc-300'
                />
            </label>

            <div className='flex gap-8 justify-center mt-4'>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='flex justify-center items-center text-xs bg-cyan-950 text-white rounded-sm py-2 px-4'
                >
                    Войти
                </button>
                <Link
                    to='/register'
                    className='flex justify-center items-center text-xs text-white'
                >
                    Нет аккаунта ?
                </Link>
            </div>
        </form>
    )
}
