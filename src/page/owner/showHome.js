import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import { getAllHome, getHomeByUser } from '../../service/homeService';
import Header from '../../components/Header';
import Cards from '../../components/Cards';

function OwnerPage() {

    const homes = useSelector((home ) => {
        return home.home.userList
    })
    const user = useSelector(({ user }) => {
        return user.currentUser
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHomeByUser(user.idUser))
    }, []);
    const [selectedFilter, setSelectedFilter] = useState(0);

    return (
        <>
            <Header />
            <Filter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />
            {homes && <Cards list={homes} user={user} />}
        </>
    )
}

export default OwnerPage