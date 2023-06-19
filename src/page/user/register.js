import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { ErrorMessage, Field, Formik, Form } from "formik";
import axios from 'axios';

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

const validateSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, "Needs to be between 6 and 12 characters long")
        .max(32, "Needs to be between 6 and 12 characters long")
        .matches(/^[a-zA-Z0-9]+$/, "Accounts can't contain special characters and spaces.")
        .required("required"),
    password: Yup.string()
        .min(6, "Needs to be between 6 and 32 characters long")
        .max(32, "Needs to be between 6 and 32 characters long")
        .matches(/^[a-zA-Z0-9]+$/, "Password can't contain special characters and spaces.")
        .required("required"),
    confirmPassword: Yup.string()
        .min(6, "Needs to be between 6 and 32 characters long")
        .max(32, "Needs to be between 6 and 32 characters long")
        .oneOf([Yup.ref('password')], "confirmPassword don't match.")
        .required("required"),
    fullName: Yup.string()
        .min(4, "Needs to be between 4 and 32 characters long")
        .max(32, "Needs to be between 4 and 32 characters long")
        .required("required"),
    phoneNumber: Yup.string()
        .min(9, "Needs to be between 9 and 12 characters long")
        .max(12, "Needs to be between 9 and 12 characters long")
        .required("required"),
})

export default function Register({setIsLogin}) {


    const navigate = useNavigate()
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
                navigate("/");
            }
        })

    };

    return (
        < >
            <section className="ftco-section">
                <div className="login-container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Register</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="login-wrap p-0">
                                <h3 className="mb-4 text-center">Sign up for an account</h3>
                                <Formik
                                    initialValues={{
                                        username: "",
                                        password: "",
                                        confirmPassword: "",
                                        fullName: "",
                                        phoneNumber: ""
                                    }}
                                    validationSchema={validateSchema}
                                    onSubmit={(values) => {
                                        handleRegister(values)
                                    }}
                                >
                                    <Form action="#" className="signin-form">
                                        <div className="form-group">
                                            <Field type="text" className="form-control-login " name={"username"}
                                                placeholder="Username" required />
                                            <div className="text-light">
                                                <ErrorMessage name={"username"}></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Field type="text" className="form-control-login " name={"fullName"}
                                                placeholder="Full Name" required />
                                            <alert className="text-light-">
                                                <ErrorMessage name={"fullName"}></ErrorMessage>
                                            </alert>
                                        </div>
                                        <div className="form-group">
                                            <Field id="password-field" name={"password"} type="password"
                                                className="form-control-login " placeholder="Password" required />
                                            <alert className="text-light">
                                                <ErrorMessage name={"password"}></ErrorMessage>
                                            </alert>

                                        </div>
                                        <div className="form-group">
                                            <Field id="password-field" name={"confirmPassword"} type="password"
                                                className="form-control-login " placeholder="Confirm Password" required />
                                            <alert className="text-light">
                                                <ErrorMessage name={"confirmPassword"}></ErrorMessage>
                                            </alert>
                                        </div>
                                        <div className="form-group">
                                            <Field type="number" className="form-control-login " name={"phoneNumber"}
                                                placeholder="Phone Number" required />
                                            <alert className="text-light">
                                                <ErrorMessage name={"phoneNumber"}></ErrorMessage>
                                            </alert>
                                        </div>
                                        <div className="form-group">
                                            <Field type="select" as="select" name="role"
                                                className="form-control-login" placeholder="role" required>
                                                <option style={{ color: "black" }} value={"user"}>User</option>
                                                <option style={{ color: "black" }} value={"owner"}>Owner</option>
                                            </Field>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit"
                                                className="form-control-login  btn btn-primary submit px-3">Register
                                            </button>
                                        </div>
                                        <div className="form-group d-md-flex">
                                            <div className="w-50">
                                                <label className="checkbox-wrap checkbox-primary">Remember Me
                                                    <input type="checkbox" checked />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="w-50 text-md-right">
                                                <a href="#" style={{ color: '#fbceb5' }}>Forgot Password</a>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>

                                <p className="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
                                <div className="social d-flex text-center">
                                    <a href="#" className="px-2 py-2 mr-md-1 rounded"><span
                                        className="ion-logo-facebook mr-2"></span> Google Login</a>
                                   <button
                                        className="ion-logo-twitter mr-2" onClick={()=>{
                                            setIsLogin(false);   
                                        }}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}