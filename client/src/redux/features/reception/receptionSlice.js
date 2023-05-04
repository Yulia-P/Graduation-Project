import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    receptions: [],
    loading: false,
}

export const createReception = createAsyncThunk(
    'reception/createReception',
    async ({weight, type_waste, station_key, key_of_weight}) => {
        try {
            const { data } = await axios.post('/receptions', {
                weight, type_waste, station_key, key_of_weight,
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const receptionSlice = createSlice({
    name: 'reception',
    initialState,
    reducers: {},
    extraReducers: {
        // Прием отходов
        [createReception.pending]: (state) => {
            state.loading = true
        },
        [createReception.fulfilled]: (state, action) => {
            state.loading = false
            // state.articles.push(action.payload)
            state.weight = action.payload.weight
            state.type_waste = action.payload.type_waste
            state.station_key = action.payload.station_key
            state.key_of_weight = action.payload.key_of_weight
        },
        [createReception.rejected]: (state) => {
            state.loading = false
        },
    },
})

export default receptionSlice.reducer