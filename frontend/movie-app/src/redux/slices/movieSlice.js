import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    movies: [],
    movie: null,

}

export const getAllByTitleContains = createAsyncThunk(
    "movie/getByTitleContains",
    async (title) => {
        const response = await axios.get("http://localhost:8080/movie/getbytitlecontains?title=" + title)
        return response.data
    }
)


export const getAllByCategoryName = createAsyncThunk(
    "movie/getMoviesByCategoryName",
    async (name) => {
        const response = await axios.get("http://localhost:8080/movie/getbycategoryname?name=" + name)
        return response.data
    }
)

export const getAllMovies = createAsyncThunk(
    "movie/getAll",
    async () => {
        const response = await axios.get("http://localhost:8080/movie/getall")
        return response.data
    }
)

export const getMovieById = createAsyncThunk(
    "movie/getById",
    async (id) => {
        const response = await axios.get("http://localhost:8080/movie/getbyid?id=" + id)
        return response.data
    }
)


export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder.addCase(getAllMovies.fulfilled, (state, action) => {
            state.movies = action.payload
        })
        builder.addCase(getMovieById.fulfilled, (state, action) => {
            state.movie = action.payload
        })
        builder.addCase(getAllByCategoryName.fulfilled, (state, action) => {
            state.movies = action.payload
        })
        builder.addCase(getAllByTitleContains.fulfilled, (state, action) => {
            state.movies = action.payload
        })
    }

})

// Action creators are generated for each case reducer function
export const { } = movieSlice.actions

export default movieSlice.reducer