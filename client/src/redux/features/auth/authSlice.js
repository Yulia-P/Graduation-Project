import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    accessToken: null,
    isLoading: false,
    status: null,
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, email, password }) => {
        try {
            const { data } = await axios.post('/register', {
                username,
                email,
                password,
            })
            if (data.accessToken) {
                window.localStorage.setItem('accessToken', data.accessToken)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }) => {
        try {
            const { data } = await axios.post('/login', {
                email,
                password,
            })
            if (data.accessToken) {
                window.localStorage.setItem('accessToken', data.accessToken)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getMe = createAsyncThunk('auth/loginUser ', async () => {
    try {
        const { data } = await axios.get('/me')
        return data
    } catch (error) {
        console.log(error)
    }
})

// export const setIsAuth =

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.accessToken = null
            state.isLoading = false
            state.status = null
        },
        setIsAuth: (state, action) =>{
            console.log(state, action)
            state.accessToken = action.payload

        }
    },
    extraReducers: {
        // Register user
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
        },
        [registerUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        // Login user
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            // ...state
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.accessToken = state.accessToken ? null : action.payload.accessToken
        },
        [loginUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        // Проверка авторизации
        [getMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.accessToken = action.payload?.accessToken
        },
        [getMe.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    },
})

export const checkIsAuth = state => Boolean(state.auth.accessToken)
// export const checkIsAuth = state => Boolean(state.accessToken)

export const { logout } = authSlice.actions
export const { setIsAuth } = authSlice.actions

export default authSlice.reducer