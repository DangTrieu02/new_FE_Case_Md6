import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createHome, getAllCategory } from '../../service/homeService';
import './css/createHome.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
const validateSchema = Yup.object().shape({
    nameHome: Yup.string()
        .required("required"),
        address: Yup.string()
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


const defaultTheme = createTheme();

export default function CreateHome({ setOpenModal }) {
    const user = useSelector(({ user }) => {
        return user.currentUser
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleCreate = async (values) => {

        await dispatch(createHome(values)).then(() => {
            setOpenModal(false)
            swal({
                title: "Create success !",
                icon: "success",
                buttons: "close",
            });
        });
        window.location.reload()
    };
    const categories = useSelector(({ home }) => home.catgoryList)

    let userId;
    if (user) {
        userId = user.idUser
    }
     useEffect(() => {
            dispatch(getAllCategory())
          }, []);

    const formik = useFormik({
                 
        initialValues: {
            nameHome: '',
            address: "",
            description: "",
            price: '',
            floorArea: '',
            bedrooms: '',
            bathrooms: '',
            status: "",
            user: userId,
            category: '',
            Image: "https://th.bing.com/th?q=Nha+O+My&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.4&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=vi&adlt=moderate&t=1&mw=247"
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
            handleCreate(values)
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

                    <Typography component="h1" variant="h5">
                        Create new home
                    </Typography>
                    <Box noValidate sx={{ mt: 1 }}>

                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between" }} className='f'>
                                    <TextField
                                        margin="normal"
                                        padding="5"

                                        width="40%"
                                        label="nameHome"
                                        name="nameHome"
                                        value={formik.values.nameHome}
                                        onChange={formik.handleChange}
                                        error={formik.touched.nameHome && Boolean(formik.errors.nameHome)}
                                        helperText={formik.touched.nameHome && formik.errors.nameHome}
                                    />
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
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
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

                                <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                                <FormControl>
                                    <InputLabel htmlFor="selectedOption">Select Option:</InputLabel>
                                    <Select
                                        id="category"
                                        name="category"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.selectedOption}
                                    >
                                        <MenuItem value="category">
                                            <em>Select an option</em>
                                        </MenuItem>
                                        {categories.map((option) => (
                                            <MenuItem key={option.idCategory} value={option.idCategory}>
                                                {option.nameCategory}  <img width={20} height={20} src={option.icon} alt=""/>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <div style={{ display: 'none' }}>
                                    <TextField
                                        name="user"
                                        value={formik.values.user}
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
    );
}