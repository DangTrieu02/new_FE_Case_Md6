import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import "./styles.css";
import KeepMountedModal from "../../page/user/Modal";
import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { GoogleLogin } from 'google-login-react';
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../../service/userService";
import { useEffect } from "react";


export default function BasicMenu({ user }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = "/"; // Redirect to the home page
        handleClose();
    };

    const loginGoogle = async (values) => {
        await dispatch(loginWithGoogle(values)).then(() => {
            navigate("/");
        });
    };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const currentPath = location.pathname;

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
        {
          user && currentPath === "/" ? (

            <MenuItem component={Link} to="/owner" className="menu-items">
              Airbnb Your Home
            </MenuItem>
          ) : (
            <MenuItem
              className="menu-items"
              component={Link}
              to="/"
              onClick={handleClose}
            >
              Home page
            </MenuItem>
          )
        }
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--grey)",
            width: "100%",
          }}
        />

        <MenuItem onClick={handleClose} className="menu-items">
          Host an experience
        </MenuItem>

        {
          user && user ? (
            <MenuItem onClick={logout} className="menu-items">
              Logout
            </MenuItem>
          ) :
            <>
              <MenuItem className="menu-items" onClick={handleOpenModal}>
                login/register
              </MenuItem>
              <MenuItem className="menu-items">
                <GoogleLogin
                  clientId='884724746848-412afcr1b3pg39o206pj5rlha8driq78.apps.googleusercontent.com'
                  onSuccess={async (res) => {
                    loginGoogle(res)
                  }}
                  onError={(err) => console.log(err)}
                  containerClass="<your_custom_class>"
                >
                  Google Login
                </GoogleLogin>
              </MenuItem>
            </>
        }
        <MenuItem onClick={handleClose} className="menu-items">
          Help
        </MenuItem>
      </Menu>

      <KeepMountedModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
