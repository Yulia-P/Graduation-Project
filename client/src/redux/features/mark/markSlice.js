import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    marks:[],
    loading:false,
    status: null,
}

export const getMark = createAsyncThunk(
    'mark/getMark',
    async () => {
        try {
            const {data} = await axios.get('/marks')
            return data
        }
        catch (error) {
            console.log(error)
        }
    }
)

export const removeMark = createAsyncThunk(
    'mark/removeMark',
    async (id) => {
        try {
            const { data } = await axios.delete(`/marks/${id}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const addMark = createAsyncThunk(
    'mark/removeMark',
    async ({ rubbish, points_per_kg, new_from_kg, image_link }) => {
        try {
            const { data } = await axios.post('/marks', {
                rubbish, points_per_kg, new_from_kg, image_link
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
);

export const updateMark  = createAsyncThunk(
    'mark/updateMark',
    async (updatedMark ) => {
        try {
            console.log(updatedMark)
            const { data } = await axios.put(
                `/marks/${updatedMark.id}`,
                updatedMark ,
            )
            return data
        } catch (error) {
            console.log(error)
        }
    },
);

export const markSlice = createSlice({
    name: 'mark',
    initialState,
    reducers: {},
    extraReducers: {
        // Получить отходы
        [getMark.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [getMark.fulfilled]: (state, action) => {
            state.loading = false
            state.marks = action.payload.marks
            // state.status = action.payload.message
        },
        [getMark.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        // Удаление отходов
        [removeMark.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [removeMark.fulfilled]: (state, action) => {
            state.loading = false;
            state.marks = state.marks.filter(
                (mark) => mark.id !== action.payload.id
            );
            state.status = action.payload.message
        },
        [removeMark.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        // Добавление отходов
        [addMark.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [addMark.fulfilled]: (state, action) => {
            state.loading = false
            // state.articles.push(action.payload)
            state.rubbish = action.payload.rubbish
            state.points_per_kg = action.payload.points_per_kg
            state.new_from_kg = action.payload.new_from_kg
            state.image_link = action.payload.image_link
            state.status = action.payload.message
        },
        [addMark.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        // Обновление отходов
        [updateMark.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [updateMark.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.marks.findIndex(
                (mark) => mark.id === action.payload.id,
            )
            state.marks[index] = action.payload
            state.status = action.payload.message
        },
        [updateMark.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
    }
})

export default markSlice.reducer