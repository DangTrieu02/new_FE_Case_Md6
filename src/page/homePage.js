// homePage.js

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Filter from './../components/Filter/index';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHome, getHomeByCategory, getHomeByName, getHomeByAddress } from '../service/homeService';

function HomePage() {
    const homes = useSelector(({ home }) => home.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllHome());
    }, []);

    const [selectedFilter, setSelectedFilter] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();

        if (selectedFilter === 0) {
            // Find homes by name
            dispatch(getHomeByName(searchQuery));
        } else if (selectedFilter === 4) {
            // Find homes by address
            dispatch(getHomeByAddress(searchQuery));
        } else {
            // Find homes by category
            dispatch(getHomeByCategory(selectedFilter));
        }
    };

    return (
        <>
            <Header />
            <Filter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                onSearch={handleSearch}
                onSearchQueryChange={setSearchQuery}
            />
            {homes && <Cards list={homes} />}
        </>
    );
}

export default HomePage;