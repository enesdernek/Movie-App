import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    likedMovies: []

}

export const likeMovieWithdraw = createAsyncThunk(
    "userPreferences/likeMovie",
    async (body) => {

        const response = await axios.post(
            `http://localhost:8080/user_preferences/handlelikemoviewithdraw?userId=${body.userId}&movieId=${body.movieId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${body.token}`,
                },
            }
        )



    }
)

export const likeMovie = createAsyncThunk(
    "userPreferences/likeMovie",
    async (body) => {
        const response = await axios.post(
            `http://localhost:8080/user_preferences/handlelikemovie?userId=${body.userId}&movieId=${body.movieId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${body.token}`,
                },
            }
        )



    }
)


export const getByUserId = createAsyncThunk(
    "userPreferences/getByUserId",
    async (body) => {
        const response = await axios.get("http://localhost:8080/user_preferences/getbyuserid?id=" + body.id, {
            headers: {
                Authorization: `Bearer ${body.token}`
            }
        })
        console.log(response.data)
        return response.data

    }
)


export const userPreferencesSlice = createSlice({
    name: 'user_preferences',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getByUserId.fulfilled, (state, action) => {
            state.likedMovies = action.payload.likedMovieDtos
        })


    }
})

// Action creators are generated for each case reducer function
export const { } = userPreferencesSlice.actions

export default userPreferencesSlice.reducer