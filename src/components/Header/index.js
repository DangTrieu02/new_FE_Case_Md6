import React, { useState } from 'react';
import logo from "../../assets/logo/long-logo.png";
import "./styles.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LanguageIcon from "@mui/icons-material/Language";
import BasicMenu from "./ProfileMenu";
import SimpleBottomNavigation from "./BottomNav";
import MobileSearchBar from "../MobileSearchBar";
import { useSelector } from "react-redux";
import BasicModal from "../../page/home/homeModal";
import { Link, useLocation } from "react-router-dom";
import SearchDialog from "./SearchDialog";

function Header() {
    const [openModal, setOpenModal] = useState(false);
    const [openSearchDialog, setOpenSearchDialog] = useState(false); // Added state for SearchDialog

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleOpenSearchDialog = () => {
        setOpenSearchDialog(true);
    };

    const handleCloseSearchDialog = () => {
        setOpenSearchDialog(false);
    };

    const user = useSelector(({ user }) => {
        return user.currentUser;
    });

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>
            <div className="navbar">
                <img src={logo} component={Link} to="/" alt="logo" className="navbar-logo" />
                <div className="search-bar">
                    <div className="search-bar-text">Anywhere</div>
                    <div className="search-bar-text">Any Week</div>
                    <div className="search-bar-text2">Add guests</div>
                    <div className="search-icon-div">
                        <SearchRoundedIcon className="search-icon" onClick={handleOpenSearchDialog} /> {/* Added onClick handler */}
                    </div>
                </div>
                <SearchDialog open={openSearchDialog} onClose={handleCloseSearchDialog} /> {/* Place SearchDialog component here */}
                <div className="profile-container">
                    {currentPath === "/owner" && user && (
                        <div className="airbnb-your-home" onClick={handleOpenModal}>
                            {" "}
                            Add your home here
                        </div>
                    )}
                    <div className="airbnb-your-home">
                        <LanguageIcon sx={{ fontSize: "1.3rem" }} />
                    </div>
                    <div className="profile-div">
                        <BasicMenu user={user} />
                    </div>
                </div>
                <MobileSearchBar />
                <SimpleBottomNavigation />
            </div>
        </>
    );
}

export default Header;
