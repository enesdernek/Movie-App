import { Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllByTitleContains } from '../redux/slices/movieSlice'

function SearchMovieInput() {

    const [inputValue, setInputValue] = useState("")
    const movies = useSelector((state) => state.movie.movies)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllByTitleContains(inputValue))
    }, [inputValue])


    return (
        <Box>
            <TextField value={inputValue} onChange={(e) => setInputValue(e.target.value)} sx={{ backgroundColor: "white", marginLeft: "40px" }} id="filled-basic" label="Film Arayın..." variant="filled" />
        </Box>
    )
}

export default SearchMovieInput