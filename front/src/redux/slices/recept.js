import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchRecept = createAsyncThunk('recept/fetchRecept', async (params) => {
    const {data} = await axios.post('/Receptions', params);
    return data;
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    const {data} = await axios.get('/Articles');
    return data;
});


const initialState = {
    data: null,
    status: 'loading',
};

const receptSlice = createSlice({
    name: 'recept',
    initialState,
    reducers:{},
    extraReducers:{

                [fetchRecept.pending]: (state) =>{
                    state.status = 'loading';
                    state.data = null;
                },
                [fetchRecept.fulfilled]: (state, action) =>{
                    state.status = 'loaded';
                    state.data= action.payload;
                },
                [fetchRecept.rejected]: (state, action) =>{
                    state.status = 'error';
                    state.data = null;
                },
        
            },
        });

        export const receptReducer = receptSlice.reducer