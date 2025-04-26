import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    comments: []
}

export const getAllCommentsByMovieId = createAsyncThunk(
    "comment/getAllCommentByMovieId",
    async (id) => {
        const response = await axios.get("http://localhost:8080/comment/getallbymovieid?id=" + id)
        return response.data
    }
)

export const deleteComment = createAsyncThunk(
    "comment/deleteComment",
    async ({ commentId, userId, token }) => {
        const response = await axios.delete(`http://localhost:8080/comment/deletecomment?commentId=${commentId}&userId=${userId}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return commentId
    }
)

export const postComment = createAsyncThunk(
    "comment/postComment",
    async ({ body, token }) => {
        console.log(body, token)
        const response = await axios.post("http://localhost:8080/comment/post", body,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
        return response.data
    }
)


export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder.addCase(getAllCommentsByMovieId.fulfilled, (state, action) => {
            state.comments = action.payload
        })
        builder.addCase(postComment.fulfilled, (state, action) => {
            state.comments.unshift(action.payload);
        })
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload);

        })

    }

})

// Action creators are generated for each case reducer function
export const { } = commentSlice.actions

export default commentSlice.reducer