import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'
import {removeComment} from "../comment/commentSlice";

const initialState = {
    promo_codes:[],
    loading:false,
    status_promo: null,
}

export const getPromoCodes = createAsyncThunk(
    'promo_codes/getPromoCodes',
    async () => {
        try {
            const { data } = await axios.get('/promo')
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const removePromoCodes = createAsyncThunk(
    'promo_codes/removePromoCodes',
    async (id) => {
        try {
            const { data } = await axios.delete(`/promo/${id}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const promo_codeSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: {
        // Получить промокод
        [getPromoCodes.pending]: (state) => {
            state.loading = true
            state.status_promo = null
        },
        [getPromoCodes.fulfilled]: (state, action) => {
            state.loading = false
            state.promo_codes = action.payload.promo_codes
        },
        [getPromoCodes.rejected]: (state, action) => {
            state.loading = false
            state.status_promo = action.payload.message
        },
        // Удалить промокод
        [removePromoCodes.pending]: (state) => {
            state.loading = true
            state.status_promo = null
        },
        [removePromoCodes.fulfilled]: (state, action) => {
            state.loading = false;
            state.status_promo = action.payload.message
            state.promo_codes = state.promo_codes.filter(
                (promo_code) => promo_code.id !== action.payload.id
            );
        },
        [removePromoCodes.rejected]: (state, action) => {
            state.status_promo = action.payload.message
            state.loading = false
        },
    }
})

export default promo_codeSlice.reducer
