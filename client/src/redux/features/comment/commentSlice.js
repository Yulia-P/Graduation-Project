import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    comments:[],
    loading:false,
    status_com: null,

}

export const createComment = createAsyncThunk(
    'comment/createComment',
    async({article_id, comment}) => {
        try {
            const {data} = await axios.post(`/ratings/${article_id}`,{
                article_id,
                comment
                }
            )
            return data
        } catch (e) {
            console.log(e)
        }
    },
    )

export const getComment = createAsyncThunk(
    'comment/getComment',
    async(article_id) => {
        try {
            const {data} = await axios.get(`/ratings/${article_id}`)
            return data
        }
        catch (e) {
            console.log(e)
        }
    }
)

export const removeComment = createAsyncThunk(
    'comments/removeComment',
    async (id) => {
        try {
            const { data } = await axios.delete(`/ratings/${id}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

// export const removeCommentAdm = createAsyncThunk(
//     'comments/removeCommentAdm',
//     async (id) => {
//         try {
//             const { data } = await axios.delete(`/ratings/admin/${id}`);
//             return data;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// );

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        // Создание коммантария
        [createComment.pending]: (state) => {
            state.loading = true
            state.status_com = null
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false
            state.status_com = action.payload.message
            // state.comments.push(action.payload)
            state.comment = action.payload.comment
            // state.commentator = action.payload.commentator
            state.article_id = action.payload.article_id
        },
        [createComment.rejected]: (state, action) => {
            state.status_com = action.payload.message
            state.loading = false
        },
        // Получение комментариев
        [getComment.pending]: (state) => {
            state.loading = true
        },
        [getComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = action.payload
            // state.status_com = action.payload.message
        },
        [getComment.rejected]: (state, action) => {
            state.loading = false
            state.status_com = action.payload.message
        },
        //Удаление коммантария
        [removeComment.pending]: (state) => {
            state.loading = true
            state.status_com = null
        },
        [removeComment.fulfilled]: (state, action) => {
            state.loading = false;
            state.status_com = action.payload.message
            state.comments = state.comments.filter(
                (comment) => comment.id !== action.payload.id
            );
        },
        [removeComment.rejected]: (state, action) => {
            state.status_com = action.payload.message
            state.loading = false
        },
        ////Удаление комментариев администратором
        // [removeCommentAdm.pending]: (state) => {
        //     state.loading = true
        //     state.status_com = null
        // },
        // [removeCommentAdm.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.comments = state.comments.filter(
        //         (comment) => comment.id !== action.payload.id
        //     );
        // },
        // [removeCommentAdm.rejected]: (state, action) => {
        //     state.status_com = action.payload.message
        //     state.loading = false
        // },
    }
})

export default commentSlice.reducer