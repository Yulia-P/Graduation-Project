import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    const {data} = await axios.get('/Articles');
    return data;
});

export const fetchPostId = createAsyncThunk('posts/fetchPostId', async(id) => {
    const {data} = await axios.get(`/Articles${id}`);
    return data;
});

export const fetchRemovePosts = createAsyncThunk(
    'posts/fetchRemovePosts',
    async(id) =>
    axios.delete(`/Articles/${id}`),
);

export const fetchLikes = createAsyncThunk('like/fetchLikes', async(id) => {
    const {data} = await axios.put(`/Like/${id}`);
    return data;
});

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    }
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{},
    extraReducers:{
        //Получение статей
        [fetchPosts.pending]: (state) =>{
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) =>{
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state, action) =>{
            state.posts.items = [];
            state.posts.status = 'error';
        },

        //
        [fetchPostId.pending]: (state) =>{
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPostId.fulfilled]: (state, action) =>{
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPostId.rejected]: (state, action) =>{
            state.posts.items = [];
            state.posts.status = 'error';
        },

        //Удаление статьи
        [fetchRemovePosts.pending]: (state, action) =>{
            state.posts.items = state.posts.items.filter(obj => obj.id !== action.meta.arg);
        },
        [fetchRemovePosts.rejected]: (state) =>{
            state.posts.status = 'error';
        },
        
        // Лайки
        [fetchLikes.pending]: (state) =>{
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchLikes.fulfilled]: (state, action) =>{
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchLikes.rejected]: (state, action) =>{
            state.posts.items = [];
            state.posts.status = 'error';
        },

    },
});

export const postsReducer = postsSlice.reducer