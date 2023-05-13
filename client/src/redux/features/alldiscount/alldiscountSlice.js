import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    alldiscounts:[],
    loading:false,
    status: null,
    valid: null,


}

export const getAllDiscounts= createAsyncThunk(
    'discount/getAllDiscounts',
    async () => {
        try {
            const {data} = await axios.get('/Discounts')
            return data
        }
        catch (error) {
            console.log(error)
        }
    }
)

export const removeAllDiscount = createAsyncThunk(
    'discount/removeAllDiscount',
    async (id) => {
        try {
            const { data } = await axios.delete(`/Discounts/${id}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const addDiscount = createAsyncThunk(
    'discount/addDiscount',
    async ({discount, count_for_dnt, promo_code}) => {
        try {
            const { data } = await axios.post('/Discounts', {
                discount, count_for_dnt, promo_code
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const updateDiscount  = createAsyncThunk(
    'discount/updateDiscount',
    async (updatedDiscount ) => {
        try {
            console.log(updatedDiscount)
            const { data } = await axios.put(
                `/discounts/${updatedDiscount.id}`,
                updatedDiscount ,
            )
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const myDiscount = createAsyncThunk(
    'discount/myDiscount',
    async () => {
        try {
            const {data} = await axios.get('/used/discounts')
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const myUsedDiscount  = createAsyncThunk(
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


export const alldiscountSlice = createSlice({
    name: 'alldiscount',
    initialState,
    reducers: {},
    extraReducers: {
        // Получить все скидки
        [getAllDiscounts.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [getAllDiscounts.fulfilled]: (state, action) => {
            state.loading = false
            state.alldiscounts = action.payload.alldiscounts
            // state.status = action.payload.message
        },
        [getAllDiscounts.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        //Удаление скидки
        [removeAllDiscount.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [removeAllDiscount.fulfilled]: (state, action) => {
            state.loading = false;
            state.alldiscounts = state.alldiscounts.filter(
                (alldiscount) => alldiscount.id !== action.payload.id
            );
            state.status = action.payload.message
        },
        [removeAllDiscount.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        // Добавление скидки
        [addDiscount.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [addDiscount.fulfilled]: (state, action) => {
            state.loading = false
            // state.articles.push(action.payload)
            state.discount = action.payload.discount
            state.count_for_dnt = action.payload.count_for_dnt
            state.promo_code = action.payload.promo_code
            state.status = action.payload.message
            state.valid = action.payload.msg
        },
        [addDiscount.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
            state.valid = action.payload.msg

        },
        // Обновление скидки
        [updateDiscount.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [updateDiscount.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.alldiscounts.findIndex(
                (alldiscount) => alldiscount.id === action.payload.id,
            )
            state.alldiscounts[index] = action.payload
            state.status = action.payload.message
        },
        [updateDiscount.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        // Получить мои скидки
        [myDiscount.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [myDiscount.fulfilled]: (state, action) => {
            state.loading = false
            state.alldiscounts = action.payload.alldiscounts
            // state.status = action.payload.message
        },
        [myDiscount.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
        // Использовать скидку
        [myUsedDiscount.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [myUsedDiscount.fulfilled]: (state, action) => {
            state.loading = false
            state.alldiscounts = action.payload
            state.status = action.payload.message
        },
        [myUsedDiscount.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },
    }
})

export default alldiscountSlice.reducer