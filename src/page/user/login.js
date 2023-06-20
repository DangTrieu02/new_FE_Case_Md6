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
import {useFormik} from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import {login} from "../../service/userService";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const validateSchema = Yup.object().shape({
  username: Yup.string()
      .min(6, "Needs to be between 6 and 12 characters long")
      .max(32, "Needs to be between 6 and 12 characters long")
      .required("required"),
  password: Yup.string()
      .min(6, "Needs to be between 6 and 12 characters long")
      .max(32, "Needs to be between 6 and 12 characters long")
      .required("required")

})

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

export default function Login({setIsLogin}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (values) => {
    await dispatch(login(values)).then((e) => {
      if (e.payload && e.payload.role) {
        const { role } = e.payload;
        if (role === "owner") {
          navigate("/owner");
        } else {
          navigate("/home");
        }
      } else if (e.payload === "user not found") {
        swal({
          title: "User not found!",
          icon: "error",
          buttons:"close",
        });
      } else if (e.payload === "wrong password") {
        swal({
          title: "Wrong password!",
          icon: "error",
          buttons:"close",
        });
        setIsLogin(false);

      }
    });
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      handleLogin(values)
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
              <Grid item >
              <Link onClick={()=>{setIsLogin(true)}} variant="body2">
              Don't have an account? Register
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