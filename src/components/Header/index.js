import React, { useEffect, useState } from "react";
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
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
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
  Select,
  MenuItem,
} from "@mui/material";
import { resetFilter, setFilter } from "../../redux/slice/homeSlice";
import {
  getHomeByName,
  getHomeByStatus,
  getHomeByPrice,
} from "../../service/homeService";
import StorageDialog from "./StorageDialog"; // Import the new StorageDialog component

function Header() {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchOption, setSearchOption] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [searchStatus, setSearchStatus] = useState("available");
  const [searchPrice, setSearchPrice] = useState({ min: "", max: "" });

  useEffect(() => {
    // Fetch the home data and update the homes array
    const fetchHomes = async () => {
      try {
        const response = await fetch("orders"); // Replace "your-api-url" with the actual API endpoint to fetch home data
        const data = await response.json();
        setHomes(data); // Update the homes array with the fetched data
      } catch (error) {
        console.log(error);
      }
    };

    fetchHomes();
  }, []);

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
    setSearchPrice({ min: "", max: "" });
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

  const handleChangeSearchPrice = (event) => {
    setSearchPrice({
      ...searchPrice,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = () => {
    if (searchOption === "name") {
      console.log("Searching by name:", searchValue);
      dispatch(setFilter({ nameHome: searchValue }));
      dispatch(getHomeByName(searchValue));
    } else if (searchOption === "status") {
      console.log("Searching by status:", searchStatus);
      dispatch(setFilter({ status: searchStatus }));
      dispatch(getHomeByStatus(searchStatus));
    } else if (searchOption === "price") {
      console.log("Searching by price range:", searchPrice);
      dispatch(setFilter({ price: searchPrice }));
      dispatch(getHomeByPrice(searchPrice));
    }
    handleCloseDialog();
  };

  const user = useSelector(({ user }) => {
    return user.currentUser;
  });

  const location = useLocation();
  const currentPath = location.pathname;

  const handleCreateHome = () => {
    dispatch(resetFilter());
    handleCloseModal();
  };

  const handleStorageIconClick = () => {
    setOpenStorageDialog(true);
  };

  const [openStorageDialog, setOpenStorageDialog] = useState(false);

  const handleCloseStorageDialog = () => {
    setOpenStorageDialog(false);
  };

  const handlePaid = () => {
    // Handle paid action
    handleCloseStorageDialog();
  };

  const handleCancel = () => {
    // Handle cancel action
    handleCloseStorageDialog();
  };

  const [homes, setHomes] = useState([]); // Define the homes array

  return (
    <>
      <div className="navbar">
        <Link to={"/"}>
          <img
            src={logo}
            component={Link}
            to="/"
            alt="logo"
            className="navbar-logo"
          />
        </Link>
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
            <div
              className="airbnb-your-home"
              onClick={handleOpenModal}
              style={{ backgroundColor: "deeppink" }}
            >
              {" "}
              Add your home here
            </div>
          )}
          <div>
            <LocalGroceryStoreOutlinedIcon onClick={handleStorageIconClick} />
          </div>
          <div className="airbnb-your-home">
            <LanguageIcon sx={{ fontSize: "1.3rem" }} />
          </div>
          <div className="profile-div">
            <BasicMenu user={user} />
          </div>
        </div>

        <SimpleBottomNavigation />
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            width: 500,
            height: 310,
          },
        }}
      >
        <DialogTitle>Select Search Option</DialogTitle>
        <DialogContent className="dialog-content">
          <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
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
              <FormControlLabel
                value="price"
                control={<Radio />}
                label="Search by price"
              />
            </RadioGroup>
          </FormControl>
          {searchOption === "name" ? (
            <TextField
              label="Home name"
              variant="outlined"
              value={searchValue}
              onChange={handleChangeSearchValue}
              style={{ margin: 35 }}
            />
          ) : searchOption === "status" ? (
            <FormControl
              component="fieldset"
              style={{ marginBottom: "20px", paddingLeft: 40 }}
            >
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
                  value="unavailable"
                  control={<Radio />}
                  label="Unavailable"
                />
              </RadioGroup>
            </FormControl>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label="Minimum price"
                variant="outlined"
                value={searchPrice.min}
                onChange={handleChangeSearchPrice}
                name="min"
                style={{ margin: 35 }}
              />
              <TextField
                label="Maximum price"
                variant="outlined"
                value={searchPrice.max}
                onChange={handleChangeSearchPrice}
                name="max"
                style={{ margin: 35 }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSearch}>Search</Button>
        </DialogActions>
      </Dialog>

      <BasicModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleCreateHome={handleCreateHome}
      />

      {/* Render the StorageDialog component */}
      <StorageDialog
        openStorageDialog={openStorageDialog}
        handleCloseStorageDialog={handleCloseStorageDialog}
        handlePaid={handlePaid}
        handleCancel={handleCancel}
      />
    </>
  );
}

export default Header;
