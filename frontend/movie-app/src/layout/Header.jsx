import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import "../style/header.css"
import { useDispatch, useSelector } from 'react-redux';
import { AccountCircle, DiscFullSharp } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { logOut } from '../redux/slices/userSlice';

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleLogOut = () => {
        dispatch(logOut())
        handleClose()
        navigate("/login")
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToProfilePage = () => {
        handleClose()
        navigate("/profile")
    }

    const navigateToLikedMoviesPage = () => {
        handleClose()
        navigate("/likedmovies")
    }

    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar sx={{ backgroundColor: "#1B1F23" }} position="static">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <div style={{ display: "flex" }}>
                            <div style={{ marginRight: "8px", marginTop: "1px" }}>
                                <LiveTvIcon className='header-icon' onClick={() => navigate("/")} />
                            </div>
                            <div >
                                <span className='header-text' onClick={() => navigate("/")} > Movieapp </span>
                            </div>
                        </div>
                    </Typography>
                    {
                        isAuthenticated ?
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={navigateToProfilePage}>Profil</MenuItem>
                                    <MenuItem onClick={navigateToLikedMoviesPage}>Beğendiğim filmler</MenuItem>
                                    <MenuItem onClick={handleLogOut}>Çıkış Yap</MenuItem>
                                </Menu>
                            </div>
                            :
                            <Button onClick={() => navigate("/login")} color="inherit">Login</Button>
                    }

                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default Header