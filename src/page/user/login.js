// login.js
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import { login } from "../../service/userService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const validateSchema = Yup.object().shape({
  username: Yup.string()
      .min(6, "Needs to be between 6 and 12 characters long")
      .max(32, "Needs to be between 6 and 12 characters long")
      .required("Required"),
  password: Yup.string()
      .min(6, "Needs to be between 6 and 12 characters long")
      .max(32, "Needs to be between 6 and 12 characters long")
      .required("Required")
})

function Login({ setIsLogin, setOpenModal }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (values) => {
    try {
      const response = await dispatch(login(values));
      if (response.payload && response.payload.role) {
        // Save the token to localStorage
        localStorage.setItem("token", response.payload.token);
        // Show success message
        swal({
          title: "Login successful!",
          text: "You are now logged in.",
          icon: "success",
          buttons: "close",
        });
        // Close the dialog or perform any other action
        setOpenModal(false);
      } else if (response.payload === "user not found") {
        swal({
          title: "User not found!",
          icon: "error",
          buttons: "close",
        });
      } else if (response.payload === "wrong password") {
        swal({
          title: "Wrong password!",
          icon: "error",
          buttons: "close",
        });
      } else {
        swal({
          title: "Login failed!",
          icon: "error",
          buttons: "close",
        });
        // Handle login failure here, such as resetting the form
        formik.resetForm();
      }
    } catch (error) {
      swal({
        title: "Login failed!",
        text: error.message,
        icon: "error",
        buttons: "close",
      });
      // Handle login failure here, such as resetting the form
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validateSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleLogin(values);
      setSubmitting(false);
    },
  });

  return (
      <ThemeProvider theme={createTheme()}>
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
              Login
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
                    label="Password"
                    name="password"
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
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
                <Grid item>
                  <Link onClick={() => { setIsLogin(true) }} variant="body2">
                    Don't have an account? Register
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );
}

export default Login;
