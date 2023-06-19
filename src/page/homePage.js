import React, { useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards';
import { list, list2 } from '../assets/cards-list';
import Filter from './../components/Filter/index';

function HomePage() {
    const [selectedFilter, setSelectedFilter] = useState(0);
  return (
    <>
    <Header />
          <Filter
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
          />
          {selectedFilter == 0 ? <Cards list={list} /> : <Cards list={list2} />}
    </>
  )
}

export default HomePage