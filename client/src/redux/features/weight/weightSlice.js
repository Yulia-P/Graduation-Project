import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    weights:[],
    loading:false,
}

export const addWeight = createAsyncThunk(
    'point/addPoint',
    async ({rubbish, weight, key_of_weight}) => {
        try {
            const { data } = await axios.post('/weight', {
                rubbish, weight, key_of_weight
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
        },
        [addWeight.fulfilled]: (state, action) => {
            state.loading = false
            // state.articles.push(action.payload)
            state.rubbish = action.payload.rubbish
            state.weight = action.payload.weight
            state.key_of_weight = action.payload.key_of_weight
        },
        [addWeight.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default weightSlice.reducer