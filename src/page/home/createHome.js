import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useFormik} from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createHome} from '../../service/homeService';
import React, {useState, useEffect} from "react";
import {Input, Stack} from "@mui/material";
import Card from "../../components/Cards/card";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "./firebase";
import CardMedia from '@mui/material/CardMedia';


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

export default function CreateHome({setOpenModal}) {
    const [uploadedImage, setUploadedImage] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);


    const handleImageClick = (index) => {
        setSelectedIndex(index);
        setSelectedImage(uploadedImage[index]);
        setDialogOpen(true);
    };
    const user = useSelector(({user}) => {
        return user.currentUser
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

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
    let userId;
    if (user) {
        userId = user.idUser
    }


    const formik = useFormik({
        initialValues: {
            nameHome: '',
            address: "",
            description: "",
            price: '',
            floorArea: '',
            bedrooms: '',
            bathrooms: '',
            status: "For rent",
            user: userId,
            category: 2,
            image: imageUrls
        },
        enableReinitialize: true,
        validationSchema: validateSchema,
        onSubmit: (values) => {
            console.log(values)
            // handleCreate(values)
        },
    });
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        const storageRef = ref(storage);
        const timestamp = Date.now();
        const fileRef = ref(storageRef, `${timestamp}_${file.name}`);
        try {
            // for (let i = 0; i < file.length; i++) {
            //     const file = file[i]
            if (uploadedImage.length < 4) {
                await uploadBytes(fileRef, file);
                const imageUrl = await getDownloadURL(fileRef);
                console.log(imageUrl)
                setImageUrls([...imageUrls, imageUrl])
            } else {
                setErrorMessage("limit 4 image");
                setSnackbarOpen(true);
            }
            // }
        } catch (error) {
            console.log("Error uploading image: " + error);
        }
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
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
                    <Box noValidate sx={{mt: 1}}>

                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <div style={{display: "flex", justifyContent: "space-between"}} className='f'>
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
                                <div style={{display: "flex", justifyContent: "space-between"}}>
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

                                <div style={{display: "flex", justifyContent: "space-between"}}>
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
                                <div style={{display: "flex", justifyContent: "space-between"}}>
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
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="status"
                                        name="status"
                                        value={formik.values.status}
                                        onChange={formik.handleChange}
                                        error={formik.touched.status && Boolean(formik.errors.status)}
                                        helperText={formik.touched.status && formik.errors.status}
                                    />

                                </div>
                                <>
                                    <label htmlFor="upload-input">
                                        <Button variant="contained" component="span">
                                            Tải lên
                                        </Button>
                                    </label>

                                    <Input
                                        type="file"
                                        onChange={handleUpload}
                                        style={{display: "none"}}
                                        id="upload-input"
                                        multiple
                                    />
                                    <Stack direction="row" spacing={2}>
                                        {uploadedImage.map((image, index) => (
                                            <Card
                                                key={index}
                                                onClick={() => handleImageClick(index)}
                                                sx={{
                                                    width: 150,
                                                    height: 150,
                                                    cursor: "pointer",
                                                    ...(selectedIndex === index && {backgroundColor: "lightblue"}),
                                                }}
                                            >
                                                <CardMedia component="img" src={image} alt={`Image ${index}`}/>
                                            </Card>
                                        ))}
                                    </Stack>
                                </>

                                <div style={{display: 'none'}}>

                                    <TextField
                                        name="user"
                                        value={formik.values.user}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}

                                >
                                    Create
                                </Button>
                            </div>
                        </form>
                        <Grid container>
                            <Grid item>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
