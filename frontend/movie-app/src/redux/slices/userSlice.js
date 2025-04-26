import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false
}

export const register = createAsyncThunk(
    "user/register",
    async (body) => {
        const response = await axios.post("http://localhost:8080/register", {
            username: body.username,
            password: body.password
        })
        return response.data
    }
)

export const authenticate = createAsyncThunk(
    "user/authenticate",
    async (body) => {
        const response = await axios.post("http://localhost:8080/authenticate", {
            username: body.username,
            password: body.password
        })
        return response.data

    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
        }

    },
    extraReducers: (builder) => {
        builder.addCase(authenticate.fulfilled, (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.userDto
            if (state.user != null && state.token != null) {
                state.isAuthenticated = true
                state.loading = false
            }

        })
        builder.addCase(authenticate.pending, (state) => {
            state.loading = true
        })
        builder.addCase(register.pending, (state) => {
            state.loading = true
        })
        builder.addCase(register.fulfilled, (state) => {
            state.loading = false
        })


    }
})

// Action creators are generated for each case reducer function
export const { logOut } = userSlice.actions

export default userSlice.reducer