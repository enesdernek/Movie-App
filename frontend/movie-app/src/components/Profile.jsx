import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {

    const user = useSelector((state) => state.user.user)
    return (
        <Box sx={{ backgroundColor: "grey", padding: "6px", marginTop: "20px" }} fullWidth>
            {
                user &&
                <h2 style={{ color: "black" }}>Username: {user.username}</h2>
            }

        </Box>
    )
}

export default Profile