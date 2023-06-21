import React, { useState} from "react";
import "./myProfile.css";
import "../../components/Header/styles.css"
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import { useSelector} from "react-redux";

export default function MyProfile() {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    const user = useSelector(state => {
        return state.user.currentUser
    });





    const handleUpdate = () => {

    }

    return (
        <>

            <MenuItem onClick={toggleModal} className="menu-items">
                My Profile
            </MenuItem>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <section className="agent-single">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="agent-avatar-box">
                                                    <img
                                                        style={{
                                                            objectFit: "cover",
                                                            width: "300px",
                                                            height: "300px",
                                                            borderRadius: "50%"
                                                        }}
                                                        src="https://static-images.vnncdn.net/files/publish/2022/9/3/bien-vo-cuc-thai-binh-346.jpeg"
                                                        className="agent-avatar img-fluid" />

                                                    <div className="col-md-8 section-md-t3">
                                                        <div className="agent-info-box">
                                                            <div className="agent-title">
                                                                <div className="title-box-d">
                                                                    <p>
                                                                        <strong>FullName: </strong>
                                                                        <span className="color-text-a"> {user.fullName} </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="agent-content mb-3">
                                                                <div className="info-agents color-a">
                                                                    <p>
                                                                        <strong>username: </strong>
                                                                        <span className="color-text-a"> {user.username} </span>
                                                                    </p>
                                                                    <p>
                                                                        <strong>Phone: </strong>
                                                                        <span
                                                                            className="color-text-a"> {user.phoneNumber} </span>
                                                                    </p>
                                                                    <p>
                                                                        <strong>Role: </strong>
                                                                        <span
                                                                            className="color-text-a"> {user.role} </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="outlined" color="error" onClick={toggleModal}>
                                                    Exit
                                                </Button>
                                                <Button variant="contained" onClick={handleUpdate}>Update</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row property-grid grid">
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            )}
        </>
    );
}
