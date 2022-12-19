import {configureStore} from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { pointsReducer } from './slices/points';

const store = configureStore({
    reducer:{
        posts: postsReducer,
        auth: authReducer,
        points: pointsReducer,
    },
});

export default store;