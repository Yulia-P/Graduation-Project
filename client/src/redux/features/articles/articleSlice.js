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
            const { data } = await axios.post('/Articles', {
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
            const { data } = await axios.get('/Articles')
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
            const { data } = await axios.delete(`/Articles/${id}`, id)
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
                `/Articles/${updatedArticles.id}`,
                updatedArticles ,
            )
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
        },
        [createArticles.fulfilled]: (state, action) => {
            state.loading = false
            // state.articles.push(action.payload)
            state.image_url = action.payload.image_url
            state.title = action.payload.title
            state.text = action.payload.text
        },
        [createArticles.rejected]: (state) => {
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
        },
        [removeArticles.fulfilled]: (state, action) => {
            state.loading = false
            state.article = state.article.filter(
                (articles) => articles.id !== action.payload.id)
        },
        [removeArticles.rejected]: (state) => {
            state.loading = false
        },
        //Обновление статьи
        [updateArticles.pending]: (state) => {
            state.loading = true
        },
        [updateArticles.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.article.findIndex(
                (articles) => articles.id === action.payload.id,
            )
            state.article[index] = action.payload
        },
        [updateArticles.rejected]: (state) => {
            state.loading = false
        },
    },
})


export default articleSlice.reducer