import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Login from './login';
import Register from './register';
import {useState} from 'react';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function KeepMountedModal({openModal, setOpenModal}) {
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const [isLogin, setIsLogin] = useState(true)
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
                    {isLogin ? <Register setIsLogin={setIsLogin}/> :
                        <Login setIsLogin={setIsLogin} setOpenModal={setOpenModal}/>}
                </Box>
            </Modal>
        </div>
    );
}