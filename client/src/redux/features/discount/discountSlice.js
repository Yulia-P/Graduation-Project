import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    discounts:[],
    loading:false,
}

export const getMyDiscounts= createAsyncThunk(
    'discount/getMyDiscounts',
    async () => {
        try {
            const {data} = await axios.get('/discounts/used')
            return data
        }
        catch (error) {
            console.log(error)
        }
    }
)

export const UseDiscount  = createAsyncThunk(
    'discount/UseDiscount',
    async (id ) => {
        try {
            console.log(id)
            const { data } = await axios.put(`/discounts/used/${id}`, id)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)


export const discountSlice = createSlice({
    name: 'discount',
    initialState,
    reducers: {},
    extraReducers: {
        // Получить мои скидки
        [getMyDiscounts.pending]: (state) => {
            state.loading = true
        },
        [getMyDiscounts.fulfilled]: (state, action) => {
            state.loading = false
            state.discounts = action.payload.discounts
        },
        [getMyDiscounts.rejected]: (state) => {
            state.loading = false
        },
        [UseDiscount.pending]: (state) => {
            state.loading = true
        },
        [UseDiscount.fulfilled]: (state, action) => {
            state.loading = false
            state.discounts = action.payload
        },
        [UseDiscount.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default discountSlice.reducer