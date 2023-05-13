import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    secretkeys:[],
    loading:false,
    status_sk: null,
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
            state.status_sk = null
        },
        [addSecretKey.fulfilled]: (state, action) => {
            state.loading = false
            // state.articles.push(action.payload)
            state.secret_key = action.payload.secret_key
            state.status_sk = action.payload.message
        },
        [addSecretKey.rejected]: (state, action) => {
            state.loading = false
            state.status_sk = action.payload.message

        },
    }
})



export default secretkeySlice.reducer
