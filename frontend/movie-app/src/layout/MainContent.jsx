import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import MovieList from '../components/MovieList'
import Movie from "../components/Movie"
import Profile from '../components/Profile'
import LikedMovies from '../components/LikedMovies'
import Register from '../components/Register'


function MainContent() {



    return (
        <Box>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/" element={<MovieList />}></Route>
                <Route path="/movies/:id" element={<Movie />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/likedmovies" element={<LikedMovies />}></Route>
                <Route path="/register" element={<Register />}></Route>

            </Routes>

        </Box>
    )
}

export default MainContent