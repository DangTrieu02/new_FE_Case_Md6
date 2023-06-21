import React, { useState } from "react";
import logo from "../../assets/logo/long-logo.png";
import "./styles.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LanguageIcon from "@mui/icons-material/Language";
import BasicMenu from "./ProfileMenu";
import SimpleBottomNavigation from "./BottomNav";
import MobileSearchBar from "../MobileSearchBar";
import {useSelector} from "react-redux";
import BasicModal from "../../page/home/homeModal";

function Header() {
  const [openModal,setOpenModal]= useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  }
  const user = useSelector(({ user })=>{
    return user.currentUser
  })
  return (
    <>
    <div className="navbar">
      <img src={logo} alt="logo" className="navbar-logo" />
      <div className="search-bar">
        <div className="search-bar-text">Anywhere</div>
        <div className="search-bar-text">Any Week</div>
        <div className="search-bar-text2">Add guests</div>
        <div className="search-icon-div">
          <SearchRoundedIcon className="search-icon" />
        </div>
      </div>
      <div className="profile-container">
        {user && <div className="airbnb-your-home" onClick={handleOpenModal}> Add your home here</div> }
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
    <BasicModal  openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default Header;
