import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CreateHome from './createHome';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 950,
    height:750,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function KeepMountedModal({ openModal, setOpenModal }) {
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const [isCreate, setIsCreate] = useState(true)
    return (
        <div>
            <Modal
                keepMounted
                open={openModal}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <CreateHome setOpenModal={setOpenModal}/>
                </Box>
            </Modal>
        </div>
    );
}