import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies } from '../redux/slices/movieSlice';
import { CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import "../style/movies.css"
import { Routes, Route, useNavigate } from "react-router-dom"
import { getAllCategory } from '../redux/slices/categorySlice';
import CategorySelect from './CategorySelect';
import SearchMovieInput from './SearchMovieInput';

function MovieList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const movies = useSelector((state) => state.movie.movies)



    useEffect(() => {
        dispatch(getAllMovies())
    }, [])


    return (
        <Box sx={{ marginTop: "10px" }}>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <SearchMovieInput />
                <CategorySelect />
            </Box>

            <Box sx={{ display: "flex", alignContent: "center", alignItems: "center" }}>

                <Grid sx={{ marginLeft: "20px" }} container  >

                    {
                        movies && movies.map((movie) => (
                            <Grid sx={{ margin: "20px" }} key={movie.id} item >
                                <Card className='movie-card' onClick={() => navigate(`/movies/${movie.id}`)} >
                                    <CardMedia
                                        sx={{ height: 378, width: { md: "672px", xs: "384px" } }}
                                        image={movie.imagePath}
                                        title={movie.title}
                                    />
                                    <CardContent sx={{ backgroundColor: "#262A2D" }}>
                                        <Typography sx={{ textAlign: "center", color: "white" }} gutterBottom variant="h5" component="div">
                                            {movie.title}
                                        </Typography>

                                    </CardContent>

                                </Card>


                            </Grid>
                        ))
                    }


                </Grid>

            </Box>
        </Box>
    )
}

export default MovieList