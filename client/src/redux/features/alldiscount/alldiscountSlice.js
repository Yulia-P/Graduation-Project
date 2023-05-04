import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    alldiscounts:[],
    loading:false,
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
    async ({discount, count_for_dnt}) => {
        try {
            const { data } = await axios.post('/Discounts', {
                discount, count_for_dnt
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
                `/Discounts/${updatedDiscount.id}`,
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
        },
        [getAllDiscounts.fulfilled]: (state, action) => {
            state.loading = false
            state.alldiscounts = action.payload.alldiscounts
        },
        [getAllDiscounts.rejected]: (state) => {
            state.loading = false
        },
        //Удаление скидки
        [removeAllDiscount.pending]: (state) => {
            state.loading = true
        },
        [removeAllDiscount.fulfilled]: (state, action) => {
            state.loading = false;
            state.alldiscounts = state.alldiscounts.filter(
                (alldiscount) => alldiscount.id !== action.payload.id
            );
        },
        [removeAllDiscount.rejected]: (state) => {
            state.loading = false
        },
        // Добавление скидки
        [addDiscount.pending]: (state) => {
            state.loading = true
        },
        [addDiscount.fulfilled]: (state, action) => {
            state.loading = false
            // state.articles.push(action.payload)
            state.discount = action.payload.discount
            state.count_for_dnt = action.payload.count_for_dnt
        },
        [addDiscount.rejected]: (state) => {
            state.loading = false
        },
        // Обновление скидки
        [updateDiscount.pending]: (state) => {
            state.loading = true
        },
        [updateDiscount.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.alldiscounts.findIndex(
                (alldiscount) => alldiscount.id === action.payload.id,
            )
            state.alldiscounts[index] = action.payload
        },
        [updateDiscount.rejected]: (state) => {
            state.loading = false
        },
        // Получить мои скидки
        [myDiscount.pending]: (state) => {
            state.loading = true
        },
        [myDiscount.fulfilled]: (state, action) => {
            state.loading = false
            state.alldiscounts = action.payload.alldiscounts
        },
        [myDiscount.rejected]: (state) => {
            state.loading = false
        },
        // Использовать скидку
        [myUsedDiscount.pending]: (state) => {
            state.loading = true
        },
        [myUsedDiscount.fulfilled]: (state, action) => {
            state.loading = false
            state.alldiscounts = action.payload
        },
        [myUsedDiscount.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default alldiscountSlice.reducer