import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    article: [],
    loading: false,
}

export const createArticles = createAsyncThunk(
    'articles/createArticles',
    async ({title, text, image_url}) => {
        try {
            const { data } = await axios.post('/articles', {
                title, text, image_url,
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

//"title", "text", "date_of_pub", "image_url", "like"

export const getArticles = createAsyncThunk(
    'articles/getArticles',
    async ({title, text, image_url}) => {
        try {
            const { data } = await axios.get('/articles')
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const removeArticles = createAsyncThunk(
    'articles/removeArticles',
    async(id) => {
        try {
            const { data } = await axios.delete(`/articles/${id}`, id)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeArticlesAdm = createAsyncThunk(
    'articles/removeArticlesAdm',
    async(id) => {
        try {
            const { data } = await axios.delete(`/articles/admin/${id}`, id)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateArticles  = createAsyncThunk(
    'articles/updateArticles',
    async (updatedArticles ) => {
        try {
            console.log(updatedArticles)
            const { data } = await axios.put(
                `/articles/${updatedArticles.id}`,
                updatedArticles ,
            )
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const Likes  = createAsyncThunk(
    'articles/Likes',
    async (id ) => {
        try {
            console.log(id)
            const { data } = await axios.put(`/like/${id}`, id)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: {
        // Создание статьи
        [createArticles.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [createArticles.fulfilled]: (state, action) => {
            state.loading = false
            // state.articles.push(action.payload)
            state.image_url = action.payload.image_url
            state.title = action.payload.title
            state.text = action.payload.text
            state.status = action.payload.message
        },
        [createArticles.rejected]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
        },
        // Получиение всех статей
        [getArticles.pending]: (state) => {
            state.loading = true
        },
        [getArticles.fulfilled]: (state, action) => {
            state.loading = false
            state.article = action.payload.article
        },
        [getArticles.rejected]: (state) => {
            state.loading = false
        },
        //Удаление статьи
        [removeArticles.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [removeArticles.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
            state.article = state.article.filter(
                (articles) => articles.id !== action.payload.id)
        },
        [removeArticles.rejected]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
        },
        //Обновление статьи
        [updateArticles.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [updateArticles.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
            const index = state.article.findIndex(
                (articles) => articles.id === action.payload.id,
            )
            state.article[index] = action.payload
        },
        [updateArticles.rejected]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
        },
        [Likes.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [Likes.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
            state.article = action.payload
        },
        [Likes.rejected]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
        },
        // Удаление статьи администратором
        [removeArticlesAdm.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [removeArticlesAdm.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
            state.article = state.article.filter(
                (articles) => articles.id !== action.payload.id)
        },
        [removeArticlesAdm.rejected]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
        },

    },
})


export default articleSlice.reducer




