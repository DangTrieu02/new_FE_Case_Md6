import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const validationSchema = yup.object({
    username: yup.string()
        .min(6, "Needs to be between 6 and 12 characters long")
        .max(32, "Needs to be between 6 and 12 characters long")
        .matches(/^[a-zA-Z0-9]+$/, "Accounts can't contain special characters and spaces.")
        .required("required"),
    password: yup.string()
        .min(6, "Needs to be between 6 and 32 characters long")
        .max(32, "Needs to be between 6 and 32 characters long")
        .matches(/^[a-zA-Z0-9]+$/, "Password can't contain special characters and spaces.")
        .required("required"),
    confirmPassword: yup.string()
        .min(6, "Needs to be between 6 and 32 characters long")
        .max(32, "Needs to be between 6 and 32 characters long")
        .oneOf([yup.ref('password')], "confirmPassword don't match.")
        .required("required"),
    fullName: yup.string()
        .min(4, "Needs to be between 4 and 32 characters long")
        .max(32, "Needs to be between 4 and 32 characters long")
        .required("required"),
    phoneNumber: yup.string()
        .min(9, "Needs to be between 9 and 12 characters long")
        .max(12, "Needs to be between 9 and 12 characters long")
        .required("required"),
});

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register({ setIsLogin }) {
    const handleRegister = async (values) => {
        axios.post('http://localhost:3001/users/register', values).then((response) => {
            if (response.status == 209) {
                swal({
                    title: "Register error",
                    text: response.data.message,
                    icon: "error",
                    button: "Close",
                });
            } else {
                swal({
                    title: "Register success",
                    text: response.data.message,
                    icon: "success",
                    button: "Close",
                });
                setIsLogin(false);
            }
        })

    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            fullName: '',
            confirmPassword: '',
            phoneNumber: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleRegister(values)
        },
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box noValidate sx={{ mt: 1 }}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Username"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                             <TextField
                                margin="normal"
                                fullWidth
                                label="Full name"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                helperText={formik.touched.fullName && formik.errors.fullName}
                            />
                             <TextField
                                margin="normal"
                                fullWidth
                                label="Password"
                                name="password"
                                type='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                             <TextField
                                margin="normal"
                                fullWidth
                                label="Confirm password"
                                name="confirmPassword"
                                type='password'
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                             <TextField
                                margin="normal"
                                fullWidth
                                label="Phone number"
                                name="phoneNumber"
                                type='number'
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>

                        </form>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item >
                                <Link onClick={() => { setIsLogin(false) }} variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 2, mb: 1 }} />
            </Container>
        </ThemeProvider>
    );
}