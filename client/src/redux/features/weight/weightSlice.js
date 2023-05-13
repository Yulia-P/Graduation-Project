import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    weights:[],
    loading:false,
    status_weight: null,
}

export const addWeight = createAsyncThunk(
    'point/addPoint',
    async ({rubbish_w, weight, key_of_weight}) => {
        try {
            const { data } = await axios.post('/weight', {
                rubbish_w, weight, key_of_weight
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const weightSlice = createSlice({
    name: 'weight',
    initialState,
    reducers: {},
    extraReducers: {
        //Добавление ключа для проверки веса
        [addWeight.pending]: (state) => {
            state.loading = true
            state.status_weight = null
        },
        [addWeight.fulfilled]: (state, action) => {
            state.loading = false
            // state.articles.push(action.payload)
            state.rubbish = action.payload.rubbish
            state.weight = action.payload.weight
            state.key_of_weight = action.payload.key_of_weight
            state.status_weight = action.payload.message
        },
        [addWeight.rejected]: (state, action) => {
            state.loading = false
            state.status_weight = action.payload.message
        },
    }
})

export default weightSlice.reducer