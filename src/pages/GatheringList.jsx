import React from 'react';
import GatheringItem from '../components/GatheringItem';
import FilteringList from '../components/FilteringList';

const GatheringList = () => {
  return (
    <div className="bg-[#EBF7FF] w-full min-h-screen overflow-hidden">
      <div className="max-w-screen-xl mx-auto xl:w-[80%] xl:mx-auto lg:w-[80%] lg:mx-auto md:w-[80%] md:mx-auto sm:w-[80%] sm:mx-auto">
        <FilteringList />
        <GatheringItem />
      </div>
    </div>
  );
};

export default GatheringList;
