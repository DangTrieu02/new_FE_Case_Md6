import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import Filter from "./../components/Filter/index";
import { useDispatch, useSelector } from "react-redux";
import { getAllHome, findByCategoryId, searchHome } from "../service/homeService";

function HomePage() {
    const homes = useSelector(({ home }) => home.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllHome());
    }, [dispatch]);

    const [selectedFilter, setSelectedFilter] = useState(0);
    const [showFilteredHomes, setShowFilteredHomes] = useState(false);
    const [address, setAddress] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleFilterToggle = () => {
        setShowFilteredHomes(!showFilteredHomes);
    };

    useEffect(() => {
        if (showFilteredHomes) {
            dispatch(findByCategoryId(selectedFilter));
        } else {
            dispatch(getAllHome());
        }
    }, [showFilteredHomes, selectedFilter, dispatch]);

    const handleSearch = () => {
        if (address !== "") {
            dispatch(searchHome(address));
        }
    };

    const handlePriceFilter = () => {
        if (minPrice !== "" && maxPrice !== "") {
            // Perform the price range filtering
            const filteredHomes = homes.filter(
                (home) => home.price >= minPrice && home.price <= maxPrice
            );
            // Dispatch an action or set the filtered homes in state
        }
    };

    return (
        <>
            <Header />
            <Filter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                showFilteredHomes={showFilteredHomes}
                handleFilterToggle={handleFilterToggle}
                address={address}
                setAddress={setAddress}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                handleSearch={handleSearch}
                handlePriceFilter={handlePriceFilter}
            />
            {homes && <Cards list={homes} />}
        </>
    );
}

export default HomePage;
