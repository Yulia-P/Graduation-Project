import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import articleSlice from "./features/articles/articleSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        articles: articleSlice,
    },
})