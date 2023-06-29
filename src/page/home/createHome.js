import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import * as Yup from "yup";
import { uploadBytes } from "firebase/storage";

import { storage } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";

import { addHome } from "../../service/homeService";
import { getCategories } from "../../service/categoryService";

const validateSchema = Yup.object().shape({
    nameHome: Yup.string().min(2, "Too short!").max(50, "Too long!").required("Required"),
    address: Yup.string().min(2, "Too short!").max(50, "Too long!").required("Required"),
    description: Yup.string().min(2, "Too short!").max(500, "Too long!").required("Required"),
});

export default function CreateHome() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const  idUser  = useSelector(({user})=>{
        return user.currentUser.idUser
    })
    console.log(idUser)
    const categories = useSelector((state) => {
        return state.categories.categories;
    });
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [uploadedImage, setUploadedImage] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleChange = async (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            const storageRef = ref(storage);
            const timestamp = Date.now();
            const fileRef = ref(storageRef, `${timestamp}_${file.name}`);
            try {
                if (uploadedImage.length < 4) {
                    await uploadBytes(fileRef, file);
                    const imageUrl = await getDownloadURL(fileRef);
                    setImageUrls((prevUrls) => [...prevUrls, imageUrl]);
                } else {
                    setErrorMessage("limit 4 image");
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.log("Error uploading image: " + error);
            }
        }
    };

    const handleCreateHome = (values) => {
        // let idUser = idUser;
        let data = { ...values, image: imageUrls, user: idUser };

        dispatch(addHome(data)).then((values) => {
            swal("Create Success !!!");
            navigate("/");
        });
    };
    useEffect(() => {
        dispatch(getCategories());
    }, []);

    return (
        <div className="row">
            <div className="container-xxl">
                <div className="container">
                    <div
                        className="text-center mx-auto mb-2 wow fadeInUp"
                        data-wow-delay="0.1s"
                        style={{ maxWidth: "600px" }}
                    >
                        <h1 className="mb-1">Create Home</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4 wow fadeInUp" style={{overflow: 'auto', height: '600px'}} data-wow-delay="0.1s">
                            {imageUrls.map(item=> item && (
                                <img className="position-relative rounded w-100 mb-2" src={item} alt={""} />
                            ))}

                        </div>
                        <div className="col-md-8">
                            <div className="wow fadeInUp" data-wow-delay="0.5s">
                                <Formik
                                    initialValues={{
                                        user:idUser,
                                        nameHome: "",
                                        address: "",
                                        description: "",
                                        price: "",
                                        floorArea: "",
                                        bedrooms: "",
                                        bathrooms: "",
                                        category: "",
                                    }}
                                    validationSchema={validateSchema}
                                    onSubmit={(values,{setFieldValue}) => {
                                        setFieldValue("userId",idUser)
                                        handleCreateHome(values);
                                    }}

                                >
                                    <Form>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <Field type="text" class="form-control" name={"nameHome"} id="nameHome" placeholder="Home" />
                                                    <label for="nameHome">Home</label>
                                                    <alert className="text-danger">
                                                        <ErrorMessage name={"nameHome"} />
                                                    </alert>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <Field type="text" class="form-control" name={"address"} id="address" placeholder="Address" />
                                                    <label for="address">Address</label>
                                                    <alert className="text-danger">
                                                        <ErrorMessage name={"address"} />
                                                    </alert>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <Field
                                                        as={"textarea"}
                                                        class="form-control"
                                                        name={"description"}
                                                        id="description"
                                                        placeholder="Description"
                                                        style={{ height: "150px" }}
                                                    />
                                                    <label for="description">Description</label>
                                                    <alert className="text-danger">
                                                        <ErrorMessage name={"description"} />
                                                    </alert>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <Field type="number" class="form-control" name={"price"} id="price" placeholder="Price" />
                                                    <label for="price">Price</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating">
                                                    <Field
                                                        type="number"
                                                        class="form-control"
                                                        name={"floorArea"}
                                                        id="floorArea"
                                                        placeholder="Floor Area"
                                                    />
                                                    <label for="floorArea">Floor Area</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating">
                                                    <Field
                                                        type="number"
                                                        class="form-control"
                                                        name={"bedrooms"}
                                                        id="bedrooms"
                                                        placeholder="Number of Bedrooms"
                                                    />
                                                    <label for="bedrooms">Number of Bedrooms</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating">
                                                    <Field
                                                        type="number"
                                                        class="form-control"
                                                        name={"bathrooms"}
                                                        id="bathrooms"
                                                        placeholder="Number of Bathrooms"
                                                    />
                                                    <label for="bathrooms">Number of Bathrooms</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <Field as="select" name={"category"} className="form-control" id="idCategory">
                                                    <option selected>Category</option>
                                                    {categories !== undefined &&
                                                        categories.map((item, index) => (
                                                            <option value={item.idCategory}>{item.nameCategory}</option>
                                                        ))}
                                                </Field>
                                            </div>
                                            <div className="col-md-6">
                                                <label for="exampleFormControlFile1">
                                                    <strong>Upload Image Here</strong>
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control-file"
                                                    id="exampleFormControlFile1"
                                                    multiple
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100 py-3" type="submit">
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
