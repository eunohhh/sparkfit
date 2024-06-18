import { useState } from 'react';

const FilteringList = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const districts = ['강남구', '강동구', '강서구', '강북구', '광진구', '구로구', '도봉구', '성동구', '용산구'];
  const handleDistrictSelect = (idx) => {
    setSelectedDistrict(idx);
  };
  return (
    <div className="flex justify-between py-10">
      <ul className="flex gap-3">
        {districts.map((district, idx) => (
          <li
            key={idx}
            onClick={() => handleDistrictSelect(idx)}
            className={`cursor-pointer lg:py-2 lg:px-3.5 lg:text-sm sm:text-[12px] sm:px-2.5 sm:py-2 rounded-md ${
              selectedDistrict === idx ? 'bg-[#82C0F9] text-[#ffffff]' : 'bg-[#ffffff]'
            }`}
          >
            {district}
          </li>
        ))}
      </ul>
      <button className="bg-[#82C0F9] text-[#ffffff] lg:text-sm lg:px-4 lg:py-2 sm:text-[12px] sm:px-3 rounded-md hover:bg-[#6FA3D4] transition-all duration-300 ease-in-out">
        + 새로운 모임 만들기
      </button>
    </div>
  );
};

export default FilteringList;
