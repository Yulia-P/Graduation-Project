import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    users:[],
    loading:false,
}

export const getUser = createAsyncThunk(
    'user/getUser',
    async () => {
        try {
            const {data} = await axios.get('/Users')
            return data
        }
        catch (error) {
            console.log(error)
        }
    }
)

export const getUserM = createAsyncThunk(
    'user/getUser',
    async () => {
        try {
            const {data} = await axios.get('/User')
            return data
        }
        catch (error) {
            console.log(error)
        }
    }
)

export const userSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {},
    extraReducers: {
        // Получить пользователей
        [getUser.pending]: (state) => {
            state.loading = true
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload.users
        },
        [getUser.rejected]: (state) => {
            state.loading = false
        },
        // Получить пользователя
        [getUserM.pending]: (state) => {
            state.loading = true
        },
        [getUserM.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload.users
        },
        [getUserM.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default userSlice.reducer
