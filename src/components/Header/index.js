// Header/index.js
import React, {useState} from "react";
import logo from "../../assets/logo/long-logo.png";
import "./styles.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LanguageIcon from "@mui/icons-material/Language";
import BasicMenu from "./ProfileMenu";
import SimpleBottomNavigation from "./BottomNav";
import MobileSearchBar from "../MobileSearchBar";
import {useSelector, useDispatch} from "react-redux";
import BasicModal from "../../page/home/homeModal";
import {Link, useLocation} from "react-router-dom";
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
import {resetFilter, setFilter} from "../../redux/slice/homeSlice";
import {
    getHomeByName,
    getHomeByStatus,
    getHomeByPrice, // Import the getHomeByPrice async thunk function
} from "../../service/homeService";

function Header() {
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchOption, setSearchOption] = useState("name");
    const [searchValue, setSearchValue] = useState("");
    const [searchStatus, setSearchStatus] = useState("available");
    const [searchPrice, setSearchPrice] = useState({min: "", max: ""}); // New state for price range

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
        setSearchPrice({min: "", max: ""}); // Reset price range state
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
            dispatch(setFilter({nameHome: searchValue}));
            dispatch(getHomeByName(searchValue));
        } else if (searchOption === "status") {
            console.log("Searching by status:", searchStatus);
            dispatch(setFilter({status: searchStatus}));
            dispatch(getHomeByStatus(searchStatus));
        } else if (searchOption === "price") {
            console.log("Searching by price range:", searchPrice);
            dispatch(setFilter({price: searchPrice}));
            dispatch(getHomeByPrice(searchPrice)); // Call getHomeByPrice with the price range
        }
        handleCloseDialog();
    };

    const user = useSelector(({user}) => {
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
                <Link to={'/'}>
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
                        <MobileSearchBar/>
                    </div>
                </div>
                <div className="profile-container">
                    {currentPath === "/owner" && user && (
                        <div
                            className="airbnb-your-home"
                            onClick={handleOpenModal}
                            style={{backgroundColor: "deeppink"}}
                        >
                            {" "}
                            Add your home here
                        </div>
                    )}
                    <div className="airbnb-your-home">
                        <LanguageIcon sx={{fontSize: "1.3rem"}}/>
                    </div>
                    <div className="profile-div">
                        <BasicMenu user={user}/>
                    </div>
                </div>

                <SimpleBottomNavigation/>
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{
                style: {
                    width: 500, // Specify the desired width
                    height: 310, // Specify the desired height
                },
            }}>
                <DialogTitle>Select Search Option</DialogTitle>
                <DialogContent className="dialog-content">
                    <FormControl component="fieldset" style={{marginBottom: '20px'}}>
                        <RadioGroup
                            aria-label="searchOption"
                            name="searchOption"
                            value={searchOption}
                            onChange={handleChangeSearchOption}
                        >
                            <FormControlLabel
                                value="name"
                                control={<Radio/>}
                                label="Search by name"
                            />
                            <FormControlLabel
                                value="status"
                                control={<Radio/>}
                                label="Search by status"
                            />
                            <FormControlLabel
                                value="price"
                                control={<Radio/>}
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
                            style={{margin: 35}}
                        />
                    ) : searchOption === "status" ? (
                        <FormControl component="fieldset" style={{marginBottom: '20px', paddingLeft: 40}}>
                            <RadioGroup
                                aria-label="searchStatus"
                                name="searchStatus"
                                value={searchStatus}
                                onChange={handleChangeSearchStatus}
                            >
                                <FormControlLabel
                                    value="available"
                                    control={<Radio/>}
                                    label="Available"
                                />
                                <FormControlLabel
                                    value="hiring"
                                    control={<Radio/>}
                                    label="Hiring"
                                />
                                <FormControlLabel
                                    value="unavailable"
                                    control={<Radio/>}
                                    label="Unavailable"
                                />
                            </RadioGroup>
                        </FormControl>
                    ) : (
                        <FormControl component="fieldset"
                                     style={{marginBottom: '20px', paddingLeft: 40, paddingTop: 10}}>
                            <TextField
                                label="Minimum price"
                                variant="outlined"
                                name="min"
                                value={searchPrice.min}
                                onChange={handleChangeSearchPrice}
                                style={{paddingBottom: 15}}
                            />
                            <TextField
                                label="Maximum price"
                                variant="outlined"
                                name="max"
                                value={searchPrice.max}
                                onChange={handleChangeSearchPrice}
                            />
                        </FormControl>
                    )}
                </DialogContent>
                <DialogActions style={{justifyContent: 'center', marginBottom: '10px'}}>
                    <Button
                        onClick={handleSearch}
                        variant="contained"
                        style={{backgroundColor: "deeppink"}}
                    >
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
