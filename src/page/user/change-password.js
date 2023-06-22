import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';

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
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values) => {
        try {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            if (!currentUser) {
                throw new Error('No user found');
            }
            let token = localStorage.getItem('access-token');
            await axios.put(`http://localhost:3001/users/change-password`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await Swal.fire('Success', 'Password changed successfully!', 'success');
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Change Password
            </Button>
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
                        {({ errors, touched }) => (
                            <Form>
                                <div>
                                    <Field
                                        as={TextField}
                                        autoFocus
                                        margin="dense"
                                        id="currentPassword"
                                        name="currentPassword"
                                        label="Current Password"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                        error={Boolean(errors.currentPassword && touched.currentPassword)}
                                        helperText={<ErrorMessage name="currentPassword" />}
                                    />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        margin="dense"
                                        id="newPassword"
                                        name="newPassword"
                                        label="New Password"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                        error={Boolean(errors.newPassword && touched.newPassword)}
                                        helperText={<ErrorMessage name="newPassword" />}
                                    />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        margin="dense"
                                        id="confirmNewPassword"
                                        name="confirmNewPassword"
                                        label="Confirm New Password"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                        error={Boolean(errors.confirmNewPassword && touched.confirmNewPassword)}
                                        helperText={<ErrorMessage name="confirmNewPassword" />}
                                    />
                                </div>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button variant="contained" color="primary" type="submit">
                                        Change Password
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
}