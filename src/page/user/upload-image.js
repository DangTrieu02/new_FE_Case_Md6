import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {storage} from "../../service/firebaseConfig";

const ImageUploadDialog = ({ open, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const fileName = Date.now() + '_' + selectedFile.name;
            const storageRef = storage.ref().child(fileName);
            const uploadTask = storageRef.put(selectedFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.log('Upload failed:', error);
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at:', downloadURL);
                        // Do something with the download URL (e.g., save it to a database)
                        // Reset the dialog state
                        setSelectedFile(null);
                        setUploadProgress(0);
                        onClose();
                    });
                }
            );
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogContent>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ maxWidth: '100%' }} />}
                {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" component="label" startIcon={<AddPhotoAlternateIcon />}>
                    Choose File
                    <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                </Button>
                <Button variant="contained" color="primary" onClick={handleUpload}>
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageUploadDialog;
