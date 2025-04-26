import { Box, Button, Checkbox, CircularProgress, FormHelperText, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import * as yup from "yup"
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate, register } from '../redux/slices/userSlice';

const validationSchema = yup.object({
    username: yup.string("Enter your username")
        .required("username is required")
        .min(3, "Username has to contain 3 characters at least.")
        .max(18, "Username can't has more than 18 characters.")
    ,
    password: yup
        .string('Enter your password')
        .required('Password is required')
        .min(6, "Password has to contain 6 characters at least "),
    passwordCheck: yup.string("Please verify your password")
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required("Password verification is required"),
    term: yup.boolean()
        .oneOf([true], "You must accept the terms")

});




function Register() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.user.loading)

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            passwordCheck: "",
            term: false,

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const body = {
                username: values.username,
                password: values.password
            }
            dispatch(register(body))
            if (!loading) {
                navigate("/login")
            }
        },

    })

    return (
        <Box sx={{ backgroundColor: "lightgrey", marginLeft: "15%", marginRight: "15%", marginTop: "50px", padding: "20px", borderRadius: "10px" }}>
            <Stack>
                <Typography sx={{ color: "#1B1F23", textAlign: "center" }} variant="h3" gutterBottom>
                    Register
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
                    <TextField id="passwordCheck" name="passwordCheck" type="password" label="Verify Password" variant="outlined" value={formik.values.passwordCheck}
                        onChange={formik.handleChange} error={formik.touched.passwordCheck && Boolean(formik.errors.passwordCheck)} />
                    {formik.touched.passwordCheck && formik.errors.passwordCheck && (
                        <FormHelperText error>{formik.errors.passwordCheck}</FormHelperText>
                    )}
                </Stack>
                <Stack direction="row" sx={{ marginTop: "20px", alignItems: "flex-start" }}>
                    <Checkbox sx={{ display: "flex" }}
                        id="term"
                        name="term"
                        color="success"
                        checked={formik.values.term}
                        onChange={formik.handleChange} />
                    <Typography sx={{ color: "black", marginTop: "10px" }}>I Accept the terms</Typography>
                </Stack>
                {formik.touched.term && formik.errors.term && (
                    <FormHelperText error>{formik.errors.term}</FormHelperText>
                )}
                <Stack sx={{ marginTop: "20px" }}>
                    <Button type="submit" variant='contained' color='error'>
                        {
                            loading &&
                                loading ? <CircularProgress sx={{ color: "white" }} /> :
                                <> REGISTER</>
                        }

                    </Button>
                </Stack>

            </form>


        </Box>
    )
}

export default Register