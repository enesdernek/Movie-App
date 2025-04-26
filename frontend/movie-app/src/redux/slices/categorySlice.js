import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    categories: []
}

export const getAllCategory = createAsyncThunk(
    "category/getAllCategory",
    async () => {
        const response = await axios.get("http://localhost:8080/category/getall")
        return response.data
    }
)


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            state.categories = action.payload
        })

    }

})

// Action creators are generated for each case reducer function
export const { } = categorySlice.actions

export default categorySlice.reducer