import {configureStore} from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { pointsReducer } from './slices/points';
import { commentsReducer } from "./slices/comments";
import { discountsReducer } from './slices/discounts';

const store = configureStore({
    reducer:{
        posts: postsReducer,
        auth: authReducer,
        points: pointsReducer,
        comments: commentsReducer,
        discounts: discountsReducer
    },
});

export default store;