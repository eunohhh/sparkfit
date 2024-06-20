import GatheringItem from '@/components/GatheringItem';
import FilteringList from '@/components/GatheringPage/FilteringList';
import React from 'react';

const GatheringList = () => {
  return (
    <div className="bg-[#EBF7FF] w-full min-h-screen overflow-hidden">
      <div className="max-w-screen-xl mx-auto xl:w-[80%] xl:mx-auto lg:w-[80%] lg:mx-auto lg:ml-[130px] md:w-[80%] md:ml-[110px] md:mx-0px auto;  sm:w-[80%] sm:mx-auto sm:ml-[100px] min-[320px]:w-[80%]">
        <FilteringList />
        <GatheringItem />
      </div>
    </div>
  );
};

export default GatheringList;
