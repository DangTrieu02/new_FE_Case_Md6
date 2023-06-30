import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';

export default function RentalDialog() {
    const currentHome = useSelector(({ home }) => home.currentHome);
    const [open, setOpen] = useState(false);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [days, setDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleRentHome = async () => {
        if (checkInDate && checkOutDate) {
            const currentDate = new Date();
            const startDate = new Date(checkInDate);
            const endDate = new Date(checkOutDate);

            if (startDate < currentDate) {
                Swal.fire('Lỗi!', 'Ngày check-in không thể là ngày trong quá khứ.', 'error');
            } else if (endDate < startDate) {
                Swal.fire('Lỗi!', 'Ngày check-out không thể nhỏ hơn ngày check-in.', 'error');
            } else if (endDate.getTime() === startDate.getTime()) {
                Swal.fire('Lỗi!', 'Ngày check-out không được trùng ngày check-in.', 'error');
            } else if (endDate < currentDate || endDate < startDate) {
                Swal.fire('Lỗi!', 'Ngày check-out không thể là ngày trong quá khứ.', 'error');
            } else {
                // Thực hiện logic đặt phòng hoặc các hành động khác tại đây

                Swal.fire('Thành công!', 'Thuê nhà thành công', 'success');

                // Đóng dialog sau khi thực hiện logic thành công
                await handleCloseDialog();
            }
            setOpen(false)
        }
    };

    const calculateDays = () => {
        if (checkInDate && checkOutDate) {
            const startDate = new Date(checkInDate);
            const endDate = new Date(checkOutDate);
            const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
            const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            setDays(numberOfDays);
        } else {
            setDays(0);
        }
    };

    useEffect(() => {
        if (currentHome) {
            if (checkInDate && checkOutDate && currentHome) {
                calculateDays();
                setTotalPrice(currentHome.price * days);
            } else {
                setTotalPrice(0);
            }
        }
    }, [checkInDate, checkOutDate, currentHome, days]);

    return (
        <>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                PaperProps={{
                    style: {
                        width: 550, // Specify the desired width
                        height: 380, // Specify the desired height
                    },
                }}
            >
                <DialogTitle>Rent Home</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid xs={6}>
                            <TextField
                                id="checkInDate"
                                label="Check-in Date"
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ margin: 40 }}
                            />
                        </Grid>
                        <Grid xs={6}>
                            <TextField
                                style={{ margin: 40 }}
                                id="checkOutDate"
                                label="Check-out Date"
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        style={{ margin: 20, justifyContent: 'center', alignItems: 'center' }}
                        id="totalPrice"
                        label="Total Price"
                        type="text"
                        value={totalPrice}
                        disabled
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="error" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={handleRentHome} color="success" variant="contained">
                        Rent
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant="outlined" onClick={handleOpenDialog}>
                Rent Home
            </Button>
        </>
    );
}
