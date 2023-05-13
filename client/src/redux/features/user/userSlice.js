import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    users:[],
    loading:false,
    status: null,
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
            state.status = null
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload.users
            // state.status = action.payload.message
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        // Получить пользователя
        [getUserM.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [getUserM.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload.users
            // state.status = action.payload.message
        },
        [getUserM.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
    }
})

export default userSlice.reducer
