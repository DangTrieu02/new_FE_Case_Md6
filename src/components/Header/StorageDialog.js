import React, {useEffect} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getRentedHome, accessOrder, refuseOrder, checkOutOrder} from "../../service/orderService";
import Swal from "sweetalert2";

function StorageDialog({openStorageDialog, handleCloseStorageDialog, handleCancel}) {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.order.order);

    useEffect(() => {
        dispatch(getRentedHome());
    }, []);

    const handlePaidClick = (orderId) => {
        dispatch(accessOrder(orderId)).then(() => {
            dispatch(getRentedHome());
            handleCloseStorageDialog();
            Swal.fire({
                icon: "success",
                title: "Paid Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        });
    };

    const handleCheckoutClick = (orderId) => {
        dispatch(checkOutOrder(orderId)).then(() => {
            dispatch(getRentedHome())
            handleCloseStorageDialog()
            Swal.fire({
                icon: "success",
                title: "Check Out Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        })
    }

    return (
        <Dialog
            open={openStorageDialog}
            onClose={handleCloseStorageDialog}
            PaperProps={{
                style: {
                    width: 900,
                    height: 500,
                },
            }}
        >
            <DialogTitle>Storage</DialogTitle>
            <DialogContent className="dialog-content">
                {/* Dialog content */}
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name Home</th>
                        <th scope="col">Address</th>
                        <th scope="col">Check In Date</th>
                        <th scope="col">Check Out Date</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderList &&
                        orderList.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.home.nameHome}</td>
                                <td>{item.home.address}</td>
                                <td>{item.checkIn}</td>
                                <td>{item.checkOut}</td>
                                <td>
                                    {item.status === "waiting" ?
                                        <td style={{display: "flex", padding: 20, justifyContent: "space-evenly"}}>
                                            <button onClick={() => handlePaidClick(item.id)}>Paid</button>
                                            <button>Delete</button>
                                        </td> :
                                        <button onClick={() => handleCheckoutClick(item.id)}> Check Out </button>}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default StorageDialog;
