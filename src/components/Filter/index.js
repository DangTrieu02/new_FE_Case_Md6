// Filter.js

import React, { useState } from "react";
import { links } from "../../assets/images-links";
import "./styles.css";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function Filter({ selectedFilter, setSelectedFilter, onSearch, onSearchQueryChange }) {
    const [searchQuery, setSearchQuery] = useState(""); // Define searchQuery state

    const handleChange = (event, newValue) => {
        setSelectedFilter(newValue);
    };

    const handleSearchQueryChange = (event) => {
        onSearchQueryChange(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(event);
    };

    return (
        <div className="filter-div">
            <Box
                sx={{
                    flexGrow: 1,
                    maxWidth: { xs: 150, sm: 1360 },
                    bgcolor: "background.paper",
                }}
            >
                <Tabs
                    value={selectedFilter}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    aria-label="visible arrows tabs example"
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            "&.Mui-disabled": { opacity: 0.3 },
                        },
                    }}
                >
                    {links.map((item, i) => (
                        <div
                            key={i}
                            className={`links-box ${i === selectedFilter && "selected-box"}`}
                            onClick={() => setSelectedFilter(i)}
                        >
                            <img src={item.imgSrc} className="links-img" />
                            <p className={`links-label ${i === selectedFilter && "selected-label"}`}>
                                <Tab label={item.label} />
                            </p>
                        </div>
                    ))}
                </Tabs>
            </Box>
        </div>
    );
}

export default Filter;