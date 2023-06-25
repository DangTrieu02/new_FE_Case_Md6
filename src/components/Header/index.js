// Header/index.js
import React, { useState } from "react";
import logo from "../../assets/logo/long-logo.png";
import "./styles.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LanguageIcon from "@mui/icons-material/Language";
import BasicMenu from "./ProfileMenu";
import SimpleBottomNavigation from "./BottomNav";
import MobileSearchBar from "../MobileSearchBar";
import { useSelector, useDispatch } from "react-redux";
import BasicModal from "../../page/home/homeModal";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { resetFilter, setFilter } from "../../redux/slice/homeSlice";
import { getHomeByName, getHomeByStatus } from "../../service/homeService";

function Header() {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchOption, setSearchOption] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [searchStatus, setSearchStatus] = useState("available");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeSearchOption = (event) => {
    setSearchOption(event.target.value);
  };

  const handleChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const handleChangeSearchStatus = (event) => {
    setSearchStatus(event.target.value);
  };

  const handleSearch = () => {
    if (searchOption === "name") {
      // Search by name logic
      console.log("Searching by name:", searchValue);
      dispatch(setFilter({ nameHome: searchValue }));
      dispatch(getHomeByName(searchValue));
    } else {
      // Search by status logic
      console.log("Searching by status:", searchStatus);
      dispatch(setFilter({ status: searchStatus }));
      dispatch(getHomeByStatus(searchStatus));
    }
    handleCloseDialog();
  };

  const user = useSelector(({ user }) => {
    return user.currentUser;
  });

  const location = useLocation();
  const currentPath = location.pathname;

  const handleCreateHome = () => {
    dispatch(resetFilter()); // Reset filter when creating a new home
    handleCloseModal();
  };

  return (
    <>
      <div className="navbar">
        <img
          src={logo}
          component={Link}
          to="/"
          alt="logo"
          className="navbar-logo"
        />
        <div className="search-bar">
          <div className="search-bar-text">Anywhere</div>
          <div className="search-bar-text">Any Week</div>
          <div className="search-bar-text2">Add guests</div>
          <div className="search-icon-div">
            <SearchRoundedIcon
              className="search-icon"
              onClick={handleOpenDialog}
            />
            <MobileSearchBar />
          </div>
        </div>
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

        <SimpleBottomNavigation />
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Select Search Option</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="searchOption"
              name="searchOption"
              value={searchOption}
              onChange={handleChangeSearchOption}
            >
              <FormControlLabel
                value="name"
                control={<Radio />}
                label="Search by name"
              />
              <FormControlLabel
                value="status"
                control={<Radio />}
                label="Search by status"
              />
            </RadioGroup>
          </FormControl>
          {searchOption === "name" ? (
            <TextField
              label="Search by name"
              variant="outlined"
              value={searchValue}
              onChange={handleChangeSearchValue}
            />
          ) : (
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="searchStatus"
                name="searchStatus"
                value={searchStatus}
                onChange={handleChangeSearchStatus}
              >
                <FormControlLabel
                  value="available"
                  control={<Radio />}
                  label="Available"
                />
                <FormControlLabel
                  value="hiring"
                  control={<Radio />}
                  label="Hiring"
                />
                <FormControlLabel
                  value="unavailable"
                  control={<Radio />}
                  label="Unavailable"
                />
              </RadioGroup>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSearch} variant="contained">
            Search
          </Button>
        </DialogActions>
      </Dialog>

      <BasicModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleCreateHome={handleCreateHome}
      />
    </>
  );
}

export default Header;
