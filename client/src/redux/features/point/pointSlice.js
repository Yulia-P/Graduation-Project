import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    points:[],
    loading:false,
    status: null,
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
    async ({address, time_of_work, rubbish, link_to_map, point_name}) => {
        try {
            const { data } = await axios.post('/points', {
                address, time_of_work, rubbish, link_to_map, point_name
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
            state.status = null
        },
        [getPoints.fulfilled]: (state, action) => {
            state.loading = false
            state.points = action.payload.points
            // state.status = action.payload.message
        },
        [getPoints.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        //Удаление точки сбора
        [removePoint.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [removePoint.fulfilled]: (state, action) => {
            state.loading = false;
            state.points = state.points.filter(
                (point) => point.id !== action.payload.id
            );
            state.status = action.payload.message
            state.status = action.payload.message
        },
        [removePoint.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        //Добавление точки сбора
        [addPoint.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [addPoint.fulfilled]: (state, action) => {
            state.loading = false
            // state.articles.push(action.payload)
            state.address = action.payload.address
            state.time_of_work = action.payload.time_of_work
            state.rubbish = action.payload.rubbish
            state.link_to_map = action.payload.link_to_map
            state.point_name = action.payload.point_name
            state.status = action.payload.message
        },
        [addPoint.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        //Обновление точки сбора
        [updatePoint.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [updatePoint.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.points.findIndex(
                (point) => point.id === action.payload.id,
            )
            state.points[index] = action.payload
            state.status = action.payload.message
        },
        [updatePoint.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        //Обновление секретного ключа
        [updatePointK.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [updatePointK.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.points.findIndex(
                (point) => point.id === action.payload.id,
            )
            state.points[index] = action.payload
            state.status = action.payload.message
        },
        [updatePointK.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
    }
})

export default pointSlice.reducer