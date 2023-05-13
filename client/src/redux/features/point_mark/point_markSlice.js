import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    points_marks:[],
    loading:false,
    status: null,
}

export const getPointsMarks = createAsyncThunk(
    'point_mark/getPointsMarks',
    async (id) => {
        try {
            const {data} = await axios.get(`/points/marks/${id}`);
            return data
        }
        catch (error) {
            console.log(error)
        }
    }
)

export const point_markSlice = createSlice({
    name: 'point_mark',
    initialState,
    reducers: {},
    extraReducers: {
        // Получить точк сбора
        [getPointsMarks.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [getPointsMarks.fulfilled]: (state, action) => {
            state.loading = false
            state.points_marks = action.payload.points_marks
            // state.status = action.payload.message
        },
        [getPointsMarks.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
    }
})
export default point_markSlice.reducer