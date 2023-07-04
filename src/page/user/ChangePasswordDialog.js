import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";

const ChangePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
        .min(6, 'New Password must be at least 6 characters')
        .required('New Password is required'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm New Password is required'),
});

export default function ChangePasswordDialog() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            if (!currentUser) {
                throw new Error('No user found');
            }
            await axios.put(`http://localhost:3001/users/change-password/${currentUser.idUser}`, values);
            handleClose();
            await Swal.fire('Success', 'Password changed successfully!', 'success');
            resetForm();

            navigate('/');
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Failed to change password', 'error');
        }
    };

    return (
        <div>
            <MenuItem variant="outlined" onClick={handleClickOpen}>
                Change Password
            </MenuItem>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            currentPassword: '',
                            newPassword: '',
                            confirmNewPassword: '',
                        }}
                        validationSchema={ChangePasswordSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="mb-3">
                                <Field
                                    as={TextField}
                                    autoFocus
                                    id="currentPassword"
                                    name="currentPassword"
                                    label="Current Password"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                                <ErrorMessage name="currentPassword" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <Field
                                    as={TextField}
                                    id="newPassword"
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                                <ErrorMessage name="newPassword" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <Field
                                    as={TextField}
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    label="Confirm New Password"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                                <ErrorMessage name="confirmNewPassword" component="div" className="text-danger" />
                            </div>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button variant="contained" color="primary" type="submit">
                                    Change Password
                                </Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
}