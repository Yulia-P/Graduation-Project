import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    discounts:[],
    loading:false,
    status_disc: null,

}

// export const getMyDiscounts= createAsyncThunk(
//     'discount/getMyDiscounts',
//     async () => {
//         try {
//             const {data} = await axios.get('/discounts/used')
//             return data
//         }
//         catch (error) {
//             console.log(error)
//         }
//     }
// )

export const UseDiscount  = createAsyncThunk(
    'discount/UseDiscount',
    async (id ) => {
        try {
            console.log(id)
            const { data } = await axios.put(`/used/discounts/${id}`, id)
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
        // [getMyDiscounts.pending]: (state) => {
        //     state.loading = true
        //     state.status = null
        // },
        // [getMyDiscounts.fulfilled]: (state, action) => {
        //     state.loading = false
        //     state.discounts = action.payload.discounts
        //     // state.status = action.payload.message
        // },
        // [getMyDiscounts.rejected]: (state, action) => {
        //     state.loading = false
        //     state.status = action.payload.message
        // },
        [UseDiscount.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [UseDiscount.fulfilled]: (state, action) => {
            state.loading = false
            state.discounts = action.payload
            state.status = action.payload.message
        },
        [UseDiscount.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
    }
})

export default discountSlice.reducer