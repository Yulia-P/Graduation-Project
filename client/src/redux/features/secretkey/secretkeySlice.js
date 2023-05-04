import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    secretkeys:[],
    loading:false,
}

export const addSecretKey = createAsyncThunk(
    'secretkey/addSecretKey',
    async ({secret_key}) => {
        try {
            const { data } = await axios.post('/keys', {
                secret_key
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const secretkeySlice = createSlice({
    name: 'secretkey',
    initialState,
    reducers: {},
    extraReducers: {
        // Добавить секретный ключ
        [addSecretKey.pending]: (state) => {
            state.loading = true
        },
        [addSecretKey.fulfilled]: (state, action) => {
            state.loading = false
            // state.articles.push(action.payload)
            state.secret_key = action.payload.secret_key
        },
        [addSecretKey.rejected]: (state) => {
            state.loading = false
        },
    }
})



export default secretkeySlice.reducer
