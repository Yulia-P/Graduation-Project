import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    points:[],
    loading:false,
}

export const getPoints = createAsyncThunk(
    'point/getPoints',
    async () => {
        try {
            const {data} = await axios.get('/points')
            return data
        }
        catch (error) {
            console.log(error)
        }
    }
)

export const removePoint = createAsyncThunk(
    'point/removePoint',
    async (id) => {
        try {
            const { data } = await axios.delete(`/points/${id}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const addPoint = createAsyncThunk(
    'point/addPoint',
    async ({address, time_of_work}) => {
        try {
            const { data } = await axios.post('/points', {
                address, time_of_work
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const updatePoint  = createAsyncThunk(
    'point/updatePoint',
    async (updatedPoint ) => {
        try {
            console.log(updatedPoint)
            const { data } = await axios.put(
                `/points/${updatedPoint.id}`,
                updatedPoint ,
            )
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const updatePointK  = createAsyncThunk(
    'point/updatePointK',
    async (updatedPointK ) => {
        try {
            console.log(updatedPointK)
            const { data } = await axios.put(
                `/points/key/${updatedPointK.id}`,
                updatedPointK ,
            )
            return data
        } catch (error) {
            console.log(error)
        }
    },
)


export const pointSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {},
    extraReducers: {
        // Получить точк сбора
        [getPoints.pending]: (state) => {
            state.loading = true
        },
        [getPoints.fulfilled]: (state, action) => {
            state.loading = false
            state.points = action.payload.points
        },
        [getPoints.rejected]: (state) => {
            state.loading = false
        },
        //Удаление точки сбора
        [removePoint.pending]: (state) => {
            state.loading = true
        },
        [removePoint.fulfilled]: (state, action) => {
            state.loading = false;
            state.points = state.points.filter(
                (point) => point.id !== action.payload.id
            );
        },
        [removePoint.rejected]: (state) => {
            state.loading = false
        },
        //Добавление точки сбора
        [addPoint.pending]: (state) => {
            state.loading = true
        },
        [addPoint.fulfilled]: (state, action) => {
            state.loading = false
            // state.articles.push(action.payload)
            state.address = action.payload.address
            state.time_of_work = action.payload.time_of_work
        },
        [addPoint.rejected]: (state) => {
            state.loading = false
        },
        //Обновление точки сбора
        [updatePoint.pending]: (state) => {
            state.loading = true
        },
        [updatePoint.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.points.findIndex(
                (point) => point.id === action.payload.id,
            )
            state.points[index] = action.payload
        },
        [updatePoint.rejected]: (state) => {
            state.loading = false
        },
        //Обновление секретного ключа
        [updatePointK.pending]: (state) => {
            state.loading = true
        },
        [updatePointK.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.points.findIndex(
                (point) => point.id === action.payload.id,
            )
            state.points[index] = action.payload
        },
        [updatePointK.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default pointSlice.reducer