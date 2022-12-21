import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchDiscounts = createAsyncThunk('discounts/fetchDiscounts', async() => {
    const {data} = await axios.get('/DiscountU');
    return data;
});

export const fetchAddDiscounts = createAsyncThunk('discounts/fetchAddDiscountsx', async (params) => {
    const {data} = await axios.post('/Discounts', params);
    return data;
});

export const fetchAllDiscounts = createAsyncThunk('discounts/fetchAllDiscounts', async() => {
    const {data} = await axios.get('/Discounts');
    return data;
});


const initialState = {
    discounts: {
        items: [],
        status: 'loading',
    }
};

const discountsSlice = createSlice({
    name: 'discounts',
    initialState,
    reducers:{},
    extraReducers:{
        //Получение статей
        [fetchDiscounts.pending]: (state) =>{
            state.discounts.items = [];
            state.discounts.status = 'loading';
        },
        [fetchDiscounts.fulfilled]: (state, action) =>{
            state.discounts.items = action.payload;
            state.discounts.status = 'loaded';
        },
        [fetchDiscounts.rejected]: (state, action) =>{
            state.discounts.items = [];
            state.discounts.status = 'error';
        },
        [fetchAllDiscounts.pending]: (state) =>{
            state.discounts.items = [];
            state.discounts.status = 'loading';
        },
        [fetchAllDiscounts.fulfilled]: (state, action) =>{
            state.discounts.items = action.payload;
            state.discounts.status = 'loaded';
        },
        [fetchAllDiscounts.rejected]: (state, action) =>{
            state.discounts.items = [];
            state.discounts.status = 'error';
        },
        [fetchAddDiscounts.pending]: (state) =>{
            state.status = 'loading';
            state.data = null;
        },
        [fetchAddDiscounts.fulfilled]: (state, action) =>{
            state.status = 'loaded';
            state.data= action.payload;
        },
        [fetchAddDiscounts.rejected]: (state, action) =>{
            state.status = 'error';
            state.data = null;
        },
    },
});

export const discountsReducer = discountsSlice.reducer