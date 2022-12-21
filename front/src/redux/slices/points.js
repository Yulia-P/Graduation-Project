import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPoints = createAsyncThunk('points/fetchPoints', async() => {
    const {data} = await axios.get('/Points');
    return data;
});

export const fetchAddPoints = createAsyncThunk('recept/fetchRecept', async (params) => {
    const {data} = await axios.post('/Points', params);
    return data;
});


const initialState = {
    points: {
        items: [],
        status: 'loading',
    }
};

const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers:{},
    extraReducers:{
        //Получение статей
        [fetchPoints.pending]: (state) =>{
            state.points.items = [];
            state.points.status = 'loading';
        },
        [fetchPoints.fulfilled]: (state, action) =>{
            state.points.items = action.payload;
            state.points.status = 'loaded';
        },
        [fetchPoints.rejected]: (state, action) =>{
            state.points.items = [];
            state.points.status = 'error';
        },
        [fetchAddPoints.pending]: (state) =>{
            state.status = 'loading';
            state.data = null;
        },
        [fetchAddPoints.fulfilled]: (state, action) =>{
            state.status = 'loaded';
            state.data= action.payload;
        },
        [fetchAddPoints.rejected]: (state, action) =>{
            state.status = 'error';
            state.data = null;
        },
    },
});

export const pointsReducer = pointsSlice.reducer