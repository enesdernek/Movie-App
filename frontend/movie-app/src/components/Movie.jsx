import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieById } from '../redux/slices/movieSlice'
import "../style/movie.css"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Grid, List, ListItem, ListItemText, TextField } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deleteComment, getAllCommentsByMovieId, postComment } from '../redux/slices/commentSlice'
import { getByUserId, likeMovie, likeMovieWithdraw } from '../redux/slices/userPreferencesSlice'
import DeleteIcon from '@mui/icons-material/Delete';


function Movie() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const movie = useSelector((state) => state.movie.movie)
    const { id } = useParams()
    const comments = useSelector((state) => state.comment.comments)
    const usersLikedMovies = useSelector((state) => state.userPreferences.likedMovies)
    const user = useSelector((state) => state.user.user)
    const token = useSelector((state) => state.user.token)
    const [isMovieLiked, setIsMovieLiked] = useState(false)
    const [commentInputValue, setCommentInputValue] = useState("")
    const [buttonVisible, setButtonVisible] = useState(false)

    const handleDeleteComment = (commentId) => {
        const userId = user.id
        dispatch(deleteComment({ commentId, userId, token }))
    }

    const handlePostComment = () => {
        if (commentInputValue && user) {
            const body = {
                content: commentInputValue,
                date: new Date(),
                userId: user.id,
                movieId: id
            }
            dispatch(postComment({ body, token }))
            setCommentInputValue("")
        }
    }

    useEffect(() => {
        if (commentInputValue) {
            setButtonVisible(true)
        } else {
            setButtonVisible(false)
        }
    }, [commentInputValue])

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
        if (usersLikedMovies) {
            usersLikedMovies.forEach((usersLikedMovie) => {
                if (id == usersLikedMovie.id) {
                    setIsMovieLiked(true)
                }
            })

        }

    }, [usersLikedMovies])

    const handleLikeMovie = () => {
        if (!isMovieLiked) {
            const body = {
                userId: user.id,
                movieId: id,
                token: token
            }
            dispatch(likeMovie(body))
            setIsMovieLiked(true)

        }
    }

    const handleLikeMovieWithDraw = () => {
        if (isMovieLiked) {
            const body = {
                userId: user.id,
                movieId: id,
                token: token
            }
            dispatch(likeMovieWithdraw(body))
            setIsMovieLiked(false)

        }
    }

    useEffect(() => {
        dispatch(getMovieById(id))
        dispatch(getAllCommentsByMovieId(id))
    }, [])


    return (
        <Box sx={{ display: "flex", marginTop: "10px" }}>
            <Grid container>
                <Grid item md={1}>

                </Grid>
                {
                    movie && comments &&
                    <Grid item xs={12} md={10}>
                        <video controls style={{ width: '100%', maxWidth: '100%', height: 'auto' }} src={movie.videoPath}></video>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                            <span style={{ fontSize: "23px" }}>{movie.title}</span>
                            <Box>
                                {
                                    isMovieLiked ? <FavoriteIcon onClick={() => handleLikeMovieWithDraw()} sx={{ color: "red" }} className="favorite-icon" />
                                        :
                                        <FavoriteIcon onClick={() => handleLikeMovie()} className="favorite-icon" />
                                }


                            </Box>
                        </Box>
                        <h3 style={{ marginTop: "50px" }}>Yorumlar</h3>

                        <TextField value={commentInputValue} onChange={(e) => setCommentInputValue(e.target.value)} sx={{ marginBottom: "10px", backgroundColor: "white" }} id="filled-basic" label="Yorum yaz..." variant="filled" fullWidth />
                        {
                            buttonVisible ? <Button onClick={handlePostComment} sx={{ marginBottom: "12px" }} variant="contained">Gönder</Button>
                                :
                                <></>

                        }

                        {
                            comments && comments.map((comment) => (
                                <List key={comment.id} className="comment-list" sx={{ width: '100%' }}>
                                    <Box sx={{ display: "flex" }}>
                                        <ListItem sx={{ justifyContent: "space-between" }}>
                                            <ListItemText
                                                secondary={
                                                    <React.Fragment >
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            sx={{ color: 'lightgray', display: 'inline' }}
                                                        >
                                                            {comment.userDto.username}
                                                        </Typography>
                                                        <span style={{ color: "white" }}> --{comment.content}</span>

                                                    </React.Fragment>
                                                }
                                            />
                                            {
                                                user &&
                                                    comment.userDto.id == user.id ? <DeleteIcon onClick={() => handleDeleteComment(comment.id)} className="delete-icon" />
                                                    :
                                                    <></>
                                            }


                                        </ListItem>
                                    </Box>
                                </List>
                            ))

                        }


                    </Grid>

                }
                <Grid item md={1}>

                </Grid>
            </Grid>
        </Box >
    )
}

export default Movie