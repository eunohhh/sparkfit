import React from 'react';
import GatheringItem from '../components/GatheringItem';
import FilteringList from '../components/FilteringList';

const GatheringList = () => {
  return (
    <div className="bg-[#EBF7FF] w-full min-h-screen overflow-hidden">
      <div className="max-w-screen-xl mx-auto xl:mx-auto lg:mx-10 md:mx-10 sm:mx-10">
        <FilteringList />
        <GatheringItem />
      </div>
    </div>
  );
};

export default GatheringList;
