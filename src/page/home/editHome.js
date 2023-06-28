import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addHome, getHomeById } from '../../service/homeService';
import { useEffect } from 'react';



const validateSchema = Yup.object().shape({
    // username: Yup.string()
    //     .min(6, "Needs to be between 6 and 12 characters long")
    //     .max(32, "Needs to be between 6 and 12 characters long")
    //     .required("required"),
    // password: Yup.string()
    //     .min(6, "Needs to be between 6 and 12 characters long")
    //     .max(32, "Needs to be between 6 and 12 characters long")
    //     .required("required")

})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const defaultTheme = createTheme(); 

export default function EditHome() {

const dispatch = useDispatch()
const navigate = useNavigate()

const handleCreate = async (values) => {

    await dispatch(addHome(values)).then(() => {
        swal({
            title: "Create success !",
            icon: "success",
            buttons: "close",
        });
    });
    window.location.reload()
};


const formik = useFormik({
             
    initialValues: {
        nameHome: "home.nameHome",
        address:" home.address",
        description: "home.description",
        price: "home.price",
        floorArea: "home.floorArea",
        bedrooms: "home.bedrooms",
        bathrooms: "home.bathrooms",
        category: 2,
        Image: "https://th.bing.com/th?q=Nha+Rong&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.4&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=vi&adlt=moderate&t=1&mw=247"
    },
    enableReinitialize:true,
    validationSchema: validateSchema,
    onSubmit: (values) => {
        handleCreate(values)
    },
});

  return (
    <div>
     
          <Box sx={style}>
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

                    <Typography component="h1" variant="h5">
                        Create new home
                    </Typography>
                    <Box noValidate sx={{ mt: 1 }}>

                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <div style={{display:"flex" , justifyContent:"space-between"}}>
                                    <TextField
                                        margin="normal"
                                        width = "40%"
                                        label="nameHome"
                                        name="nameHome"
                                        value={formik.values.nameHome}
                                        onChange={formik.handleChange}
                                        error={formik.touched.nameHome && Boolean(formik.errors.nameHome)}
                                        helperText={formik.touched.nameHome && formik.errors.nameHome}
                                    />
                                    <TextField
                                        margin="normal"
                                        width = "40%"
                                        label="address"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                    />
                                </div>
                                <div style={{display:"flex" , justifyContent:"space-between"}}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="price"
                                        name="price"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        error={formik.touched.price && Boolean(formik.errors.price)}
                                        helperText={formik.touched.price && formik.errors.price}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="floorArea"
                                        name="floorArea"
                                        value={formik.values.floorArea}
                                        onChange={formik.handleChange}
                                        error={formik.touched.floorArea && Boolean(formik.errors.floorArea)}
                                        helperText={formik.touched.floorArea && formik.errors.floorArea}
                                    />
                                </div>

                                <div style={{display:"flex" , justifyContent:"space-between"}}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="bedrooms"
                                        name="bedrooms"
                                        value={formik.values.bedrooms}
                                        onChange={formik.handleChange}
                                        error={formik.touched.bedrooms && Boolean(formik.errors.bedrooms)}
                                        helperText={formik.touched.bedrooms && formik.errors.bedrooms}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="bathrooms"
                                        name="bathrooms"
                                        value={formik.values.bathrooms}
                                        onChange={formik.handleChange}
                                        error={formik.touched.bathrooms && Boolean(formik.errors.bathrooms)}
                                        helperText={formik.touched.bathrooms && formik.errors.bathrooms}
                                    />
                                </div>
                                <div style={{display:"flex" , justifyContent:"space-between"}}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="description"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Create
                                </Button>
                            </div>
                        </form>
                        <Grid container>
                            <Grid item >
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
          </Box>
    </div>
  );
}
