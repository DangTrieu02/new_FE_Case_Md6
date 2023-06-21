import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchHome } from "../../service/homeService";
import logo from "../../assets/logo/long-logo.png";
import "./styles.css";
import LanguageIcon from "@mui/icons-material/Language";
import BasicMenu from "./ProfileMenu";
import SimpleBottomNavigation from "./BottomNav";
import MobileSearchBar from "../MobileSearchBar";
import Box from "@mui/material/Box";
import Tabs, {tabsClasses} from "@mui/material/Tabs";
import {links} from "../../assets/images-links";
import Tab from "@mui/material/Tab";


function Header({ selectedFilter, setSelectedFilter }) {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchHome([searchValue]));
    };

    return (
        <>
        <div className="navbar">
            <img src={logo} alt="logo" className="navbar-logo" />

            <form onSubmit={handleSearch}>
                <div
                    style={{
                        marginLeft: 200,
                        width: 350,
                        height: 48,
                        border: "solid lightgray 1px",
                        borderRadius: 100,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <a style={{ borderRight: "solid gray 1px", paddingRight: 5 }}>
                        Anywhere
                    </a>
                    <input
                        type="search"
                        name="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        style={{ width: 220, height: 46, border: "none", outline: "none" }}
                    />
                    <button
                        type="submit"
                        style={{
                            borderRadius: 100,
                            backgroundColor: "#FF385c",
                            border: "none",
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="white"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                            />
                        </svg>
                    </button>
                </div>
            </form>

            <div className="profile-container">
                <div className="airbnb-your-home">Airbnb your home</div>
                <div className="airbnb-your-home">
                    <LanguageIcon sx={{ fontSize: "1.3rem" }} />
                </div>
                <div className="profile-div">
                    <BasicMenu />
                </div>
            </div>
            <MobileSearchBar />
            <SimpleBottomNavigation />
        </div>
    <div className="filter-div">
        <Box
            sx={{
                flexGrow: 1,
                maxWidth: { xs: 150, sm: 1360 },
                bgcolor: 'background.paper',
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.3 },
                    },
                }}
            >

                {links.map((item, i) => (
                    <div
                        key={i}
                        className={`links-box ${i == selectedFilter && "selected-box"}`}
                        onClick={() => {
                            console.log("selecting key", i);
                            setSelectedFilter(i);
                        }}
                    >
                        <img src={item.imgSrc} className="links-img" />
                        <p
                            className={`links-label ${i == selectedFilter && "selected-label"}`}
                        >
                            <Tab label={item.label}/>

                        </p>
                    </div>
                ))}
            </Tabs>
        </Box>
    </div>
        </>
    );
}

export default Header;
