import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getByUserId } from '../redux/slices/userPreferencesSlice'
import { useNavigate } from 'react-router-dom'

function LikedMovies() {

    const likedMovies = useSelector((state) => state.userPreferences.likedMovies)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user)
    const token = useSelector((state) => state.user.token)

    useEffect(() => {
        if (user) {
            const body = {
                id: user.id,
                token: token
            }
            dispatch(getByUserId(body))
        }
    }, [user])

    useEffect(() => {
        console.log(likedMovies)
    }, [likedMovies])

    return (
        <Box sx={{ marginTop: "10px" }}>

            <Box sx={{ display: "flex", alignContent: "center", alignItems: "center" }}>
                <Grid sx={{ marginLeft: "20px" }} container  >

                    {
                        likedMovies.length > 0 ?
                            likedMovies && likedMovies.map((likedMovie) => (
                                <Grid sx={{ margin: "20px" }} key={likedMovie.id} item >
                                    <Card className='movie-card' onClick={() => navigate(`/movies/${likedMovie.id}`)} >
                                        <CardMedia
                                            sx={{ height: 378, width: { md: "672px", xs: "384px" } }}
                                            image={likedMovie.imagePath}
                                            title={likedMovie.title}
                                        />
                                        <CardContent sx={{ backgroundColor: "#262A2D" }}>
                                            <Typography sx={{ textAlign: "center", color: "white" }} gutterBottom variant="h5" component="div">
                                                {likedMovie.title}
                                            </Typography>

                                        </CardContent>

                                    </Card>


                                </Grid>
                            )) :

                            <Box>Beğendiniz bir film yoktur.</Box>
                    }




                </Grid>

            </Box>
        </Box>
    )
}

export default LikedMovies