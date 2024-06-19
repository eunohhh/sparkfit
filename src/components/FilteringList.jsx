import React, { useState } from 'react';
import useFilterStore from '@/zustand/filter.list';

const FilteringList = () => {
  const { selectedButton, handleButtonSelect } = useFilterStore();
  const SortButton = ['현재 사용자 위치', '마감기한'];

  return (
    <div className="flex justify-between py-10">
      <ul className="flex gap-3">
        {SortButton.map((sort, idx) => (
          <li
            key={idx}
            onClick={() => handleButtonSelect(idx)}
            className={`cursor-pointer lg:py-2 lg:px-3.5 lg:text-sm sm:text-[12px] sm:px-2.5 sm:py-2 rounded-md ${
              selectedButton === idx ? 'bg-[#82C0F9] text-[#ffffff]' : 'bg-[#ffffff]'
            }`}
          >
            {sort}
          </li>
        ))}
      </ul>
      <button className="bg-[#82C0F9] text-[#ffffff] lg:text-sm lg:px-4 lg:py-2 sm:text-[12px] sm:px-3 sm:hidden md:block rounded-md hover:bg-[#6FA3D4] transition-all duration-300 ease-in-out">
        + 새로운 모임 만들기
      </button>
    </div>
  );
};

export default FilteringList;
