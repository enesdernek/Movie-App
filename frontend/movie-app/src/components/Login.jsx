import { Box, Button, FormHelperText, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import * as yup from "yup"
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../redux/slices/userSlice';
import "../style/login.css"

const validationSchema = yup.object({
    username: yup.string("Enter your username")
        .required("username is required")
    ,
    password: yup
        .string('Enter your password')
        .required('Password is required'),
});




function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.user.user)
    const token = useSelector((state) => state.user.token)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const loading = useSelector((state) => state.user.loading)

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated])


    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const body = {
                username: values.username,
                password: values.password
            }
            dispatch(authenticate(body))
        },

    })

    return (
        <Box sx={{ backgroundColor: "lightgrey", marginLeft: "15%", marginRight: "15%", marginTop: "50px", padding: "20px", borderRadius: "10px" }}>
            <Stack>
                <Typography sx={{ color: "#1B1F23", textAlign: "center" }} variant="h3" gutterBottom>
                    Login
                </Typography>
            </Stack>
            <form onSubmit={formik.handleSubmit}>
                <Stack sx={{ marginTop: "20px" }}>
                    <TextField id="username" name="username" type="text" label="username" variant="outlined" value={formik.values.username}
                        onChange={formik.handleChange} error={formik.touched.username && Boolean(formik.errors.username)} />
                    {formik.touched.username && formik.errors.username && (
                        <FormHelperText error>{formik.errors.username}</FormHelperText>
                    )}
                </Stack>
                <Stack sx={{ marginTop: "20px" }}>
                    <TextField id="password" name="password" type="password" label="password" variant="outlined" value={formik.values.password}
                        onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)} />
                    {formik.touched.password && formik.errors.password && (
                        <FormHelperText error>{formik.errors.password}</FormHelperText>
                    )}
                </Stack>
                <Stack sx={{ marginTop: "20px" }}>
                    <Button type="submit" variant='contained' color='error'>LOGIN</Button>
                </Stack>
            </form>
            <Typography sx={{ color: "black", marginTop: "20px" }}>Don't have an account ? <span onClick={() => navigate("/register")} className='register-text' style={{ color: "red", textDecoration: "underline" }}>Click here to register.</span></Typography>
        </Box>
    )
}

export default Login