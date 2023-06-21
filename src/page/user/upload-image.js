import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { storage } from '../../service/firebase/firebaseConfig';
import axios from 'axios';

const UploadImage = ({ homeId }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = async () => {
        try {
            const storageRef = storage.ref();
            const imageRef = storageRef.child(`images/${homeId}/${selectedImage.name}`);
            const uploadTask = imageRef.put(selectedImage);

            await uploadTask;
            const downloadURL = await imageRef.getDownloadURL();

            setImageUrl(downloadURL);
            saveImageUrlToDatabase(downloadURL);
            Swal.fire('Success', 'Image uploaded successfully!', 'success');
            handleClose();
        } catch (error) {
            console.error(error);
            // Handle error (if needed)
        }
    };

    const saveImageUrlToDatabase = async (imageUrl) => {
        try {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            if (!currentUser) {
                throw new Error('No user found');
            }
            const token = localStorage.getItem('access-token');

            const response = await axios.patch(
                `http://localhost:3001/homes/${homeId}`,
                {
                    imageUrl: imageUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Handle response (if needed)
        } catch (error) {
            console.error(error);
            // Handle error (if needed)
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                Upload Image
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload Image</DialogTitle>
                <DialogContent>
                    <input type="file" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded" />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpload}>Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UploadImage;
