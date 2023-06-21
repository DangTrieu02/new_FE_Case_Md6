import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHome } from '../service/homeService';

function HomePage() {
    const homes = useSelector(({ home }) => {
        return home.list
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllHome())
    }, []);

    const [selectedFilter, setSelectedFilter] = useState(0);

    return (
        <>
            <Header />

            { homes && <Cards list={homes} />}
        </>
    )
}

export default HomePage
