import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import "./styles.css";
import KeepMountedModal from "../../page/user/Modal";
import { useState } from "react";
import MyProfile from "../../page/user/myProfile";


export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal,setOpenModal]= useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  }

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="profile-menu-flex"
      >
        <MenuRoundedIcon />
        <AccountCircleRoundedIcon />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".MuiPaper-root": {
            minWidth: "200px",
            borderRadius: "1rem",
            boxShadow: "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
          },
        }}
      >
        <MenuItem className="menu-items">

        </MenuItem>
        <MenuItem  className="menu-items">

        </MenuItem>
        <MenuItem  className="menu-items">
          <button onClick={handleOpenModal}>abc</button>
        </MenuItem>
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--grey)",
            width: "100%",
          }}
        />
        <MenuItem onClick={handleClose} className="menu-items">
          Airbnb Your Home
        </MenuItem>

            <MyProfile />

        <MenuItem onClick={handleClose} className="menu-items">
            Log out
        </MenuItem>
      </Menu>
      <KeepMountedModal openModal={openModal} setOpenModal={setOpenModal}/>
    </div>
  );
}
