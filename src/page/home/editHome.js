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
import './css/detail.css'
import Header from '../../components/Header'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editHome, getHomeById } from '../../service/homeService';
import swal from "sweetalert";

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


export default function EditHome() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    let { id } = useParams()
    const currentHome = useSelector(({ home }) => {
        return home.currentHome
    })
    React.useEffect(() => {
        dispatch(getHomeById(id))
    }, [])
    const handleEdit = async (values) => {

        await dispatch(editHome({ id: id, newHome: values })).then(() => {
            swal({
                title: "Create success !",
                icon: "success",
                buttons: "close",
            });
            navigate('/owner')
        });
    };

    const defaultTheme = createTheme()

    const formik = useFormik({
        initialValues: {
            nameHome: currentHome && currentHome.nameHome,
            address: currentHome && currentHome.address,
            description: currentHome && currentHome.description,
            price: currentHome && currentHome.price,
            floorArea: currentHome && currentHome.floorArea,
            bedrooms: currentHome && currentHome.bedrooms,
            bathrooms: currentHome && currentHome.bathrooms,
            category: currentHome && currentHome.category,
            Image: currentHome && currentHome.image[0]
        },
        enableReinitialize: true,
        validationSchema: validateSchema,
        onSubmit: (values) => {
            handleEdit(values)
        },
    });
    return (
        <>
            <Header />
            {currentHome
                &&
                <div className="container">
                    <div className="row justify-content-center mt-4">
                        <div className="col-lg-6 mb-5 mb-lg-0" style={{ marginTop: '100px' }}>

                            <div className="row justify-content-center mt-2">
                                <div className='col-9'>
                                <img src={currentHome.image[0].image} class="d-block w-100 mb-4" alt="..." />    
                                </div>
                                <div className='col-3'>
                                <img src={currentHome.image[0].image} class="d-block w-100 mb-4" alt="..." />    
                                <img src={currentHome.image[0].image} class="d-block w-100 mb-4" alt="..." />   
                                <img src={currentHome.image[0].image} class="d-block w-100 mb-4 " alt="..." />               
                                </div>
                            </div>  
                        </div>
                        <div className="col-lg-6">
                            <div className="ps-lg-1-6 ps-xl-5">
                                <div className="mb-5 wow fadeIn" >
                                    <div className="text-start mb-1-6 wow fadeIn"  style={{ marginLeft: '-220px' }}>
                                        <h3 className="h1 mb-0 text-primary">#Edit your home</h3>
                                    </div>
                                    <div>
                                        <Box>
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
                                                        <Box noValidate sx={{ mt: 1 }}>

                                                            <form onSubmit={formik.handleSubmit}>
                                                                <div>
                                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                        <div style={{ marginRight: '20px' }}>
                                                                            <TextField
                                                                                margin="normal"
                                                                                width="40%"
                                                                                label="nameHome"
                                                                                name="nameHome"
                                                                                value={formik.values.nameHome}
                                                                                onChange={formik.handleChange}
                                                                                error={formik.touched.nameHome && Boolean(formik.errors.nameHome)}
                                                                                helperText={formik.touched.nameHome && formik.errors.nameHome}
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <TextField
                                                                                margin="normal"
                                                                                width="40%"
                                                                                label="address"
                                                                                name="address"
                                                                                value={formik.values.address}
                                                                                onChange={formik.handleChange}
                                                                                error={formik.touched.address && Boolean(formik.errors.address)}
                                                                                helperText={formik.touched.address && formik.errors.address}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                                        <div style={{ marginRight: '20px' }}>
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
                                                                        </div>
                                                                        <div>
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
                                                                    </div>

                                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                        <div style={{ marginRight: '20px' }}>
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
                                                                        </div>
                                                                        <div>
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
                                                                    </div>
                                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                                                                        {/* {currentHome && <img src={currentHome.image[0].image} alt="" />} */}
                                                                    </div>
                                                                    <Button
                                                                        type="submit"
                                                                        fullWidth
                                                                        variant="contained"
                                                                        sx={{ mt: 3, mb: 2 }}
                                                                    >
                                                                        Save
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        fullWidth
                                                                        onClick={() => navigate('/owner')}>
                                                                        End
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>

    )
}
