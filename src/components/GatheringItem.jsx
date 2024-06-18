import supabase from '@/supabase';
import React, { useEffect, useState } from 'react';

const GatheringItem = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlace = async () => {
      const { data: placeData, error } = await supabase.from('Places').select('*');

      if (placeData) {
        setPlaces(placeData);
        console.log('모임 데이터를 가지고왔습니다.', placeData);
      } else {
        console.error('모임 데이터를 가지고오지 못했습니다.', error);
      }
    };
    fetchPlace();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {places.map((place) => {
        return (
          <div key={place.id} className="flex gap-8 bg-[#ffffff] p-8 shadow-lg rounded-xl relative">
            <svg
              className="absolute w-[25%] h-[25%] left-[-14%] top-[33%] fill-[#ffffff] rotate-90"
              viewBox="0 0 100 100"
            >
              <polygon points="0,0 100,0 50,100" />
            </svg>
            {/* 모임 이미지 */}
            <div>
              <img src="http://via.placeholder.com/300x200" alt="모임이미지" />
            </div>
            {/* 모임 설명 */}
            <div className="w-full flex flex-col gap-5">
              {/* 모임 제목/해시태그/버튼 */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl mb-3 font-semibold">{place.gather_name}</h2>
                  <ul className="flex gap-2.5">
                    <li className="rounded-full bg-[#efefef] px-5 py-1.5 line-height-none text-xs">
                      {place.sports_name}
                    </li>
                    <li className="py-1.5 line-height-none text-xs">{place.region}</li>
                    <li className="py-1.5 line-height-none text-xs">멤버 50</li>
                  </ul>
                </div>
                <div className="md:block sm:hidden">
                  <button className="transition-all duration-300 ease-in-out bg-[#efefef] rounded-lg px-8 py-3 text-sm text-[#2e2e2e] hover:bg-[#dddddd]">
                    상세보기
                  </button>
                </div>
              </div>

              <p className="text-sm md:w-[80%] sm:w-full overflow-hidden text-ellipsis line-clamp-2 ">{place.texts}</p>

              <div className="sm:block md:hidden">
                <button className="w-full transition-all duration-300 ease-in-out bg-[#efefef] rounded-lg px-8 py-3 text-sm text-[#2e2e2e] hover:bg-[#dddddd]">
                  상세보기
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GatheringItem;
