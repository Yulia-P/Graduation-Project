import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchDiscounts = createAsyncThunk('discounts/fetchDiscounts', async() => {
    const {data} = await axios.get('/DiscountU');
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
    },
});

export const discountsReducer = discountsSlice.reducer