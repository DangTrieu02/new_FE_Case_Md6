import React, { useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards';
import { list, list2 } from '../assets/cards-list';
import Filter from './../components/Filter/index';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHome } from '../service/homeService';


function HomePage() {
  const homes = useSelector(({ home }) => {
    console.log(home,4444);
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
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
        {selectedFilter === 0 ? <Cards list={list} /> : <Cards list={list2} />}
    </>
  )
}

export default HomePage