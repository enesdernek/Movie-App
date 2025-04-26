import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../redux/slices/categorySlice';
import { getAllByCategoryName, getAllMovies } from '../redux/slices/movieSlice';

function CategorySelect() {

    const [age, setAge] = React.useState('');
    const dispatch = useDispatch()
    const movies = useSelector((state) => state.movie.movies)
    const categories = useSelector((state) => state.category.categories)

    const handleChange = (event) => {
        const selectedCategory = event.target.value;
        setAge(selectedCategory); // Make sure to update the `age` state variable or use another variable for category
        handleSelect(selectedCategory);
    };


    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const handleSelect = (name) => {
        if (name == "all") {
            dispatch(getAllMovies())
        }
        dispatch(getAllByCategoryName(name))
    }


    return (

        <Box sx={{ minWidth: 120, backgroundColor: "white", marginRight: "64px" }}>
            <FormControl variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}

                >
                    <MenuItem value={"all"}>Tümü</MenuItem>
                    {
                        categories && categories.map((category) => (
                            <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                        ))
                    }


                </Select>
            </FormControl>
        </Box>
    )
}

export default CategorySelect