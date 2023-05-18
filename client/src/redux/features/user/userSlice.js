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

export const changeUsername = createAsyncThunk(
    'user/changeUsername',
    async (updatedUsername) => {
        try {
            const {data} = await axios.put('/user', updatedUsername,
                )
            return data
        }
        catch (error) {
            console.log(error)
        }
    }
)

export const changePass = createAsyncThunk(
    'user/changePass',
    async (updatedPass) => {
        try {
            const {data} = await axios.put('/user/pass', updatedPass,
            )
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
        //
        [changeUsername.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [changeUsername.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.users.findIndex(
                (user) => user.id === action.payload.id,
            )
            state.users[index] = action.payload
            state.status = action.payload.message
        },
        [changeUsername.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        //
        [changePass.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [changePass.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.users.findIndex(
                (user) => user.id === action.payload.id,
            )
            state.users[index] = action.payload
            state.status = action.payload.message
        },
        [changePass.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
    }
})

export default userSlice.reducer
