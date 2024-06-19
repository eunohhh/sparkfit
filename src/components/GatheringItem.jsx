import supabase from '@/supabase';
import useFilterStore from '@/zustand/filter.list';
import React, { useEffect, useState } from 'react';

const GatheringItem = () => {
  const [places, setPlaces] = useState([]);
  const { selectedButton } = useFilterStore();

  useEffect(() => {
    const fetchPlace = async () => {
      const { data: placeData, error } = await supabase.from('Places').select('*');

      if (placeData) {
        setPlaces(placeData);
        console.log('모임 데이터를 가지고왔습니다.', placeData);
      } else {
        console.error('모임 데이터를 가지고오지 못했습니다.', error);
      }

      //사용자의 현재 위치 가져오기
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        console.log(userLatitude, userLongitude);

        const sortedPlaces = placeData
          .map((place) => ({
            ...place,
            distance: calculateDistance(userLatitude, userLongitude, place.lat, place.long)
          }))
          .sort((a, b) => a.distance - b.distance);
      });

      // 거리 계산 함수 (Haversine 공식)
      function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // 지구 반지름 (km)
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      }

      function toRadians(degrees) {
        return (degrees * Math.PI) / 180;
      }

      if (selectedButton === 1) {
        //최신순 정렬
        return placeData.sort((a, b) => a.deadline.localeCompare(b.deadline));
      }
    };
    fetchPlace();
  }, [selectedButton]);

  return (
    <div className="flex flex-col gap-8 mb-20">
      {places.map((place) => {
        return (
          <div key={place.id} className="flex gap-8 bg-[#ffffff] p-8 shadow-lg rounded-xl relative">
            {/* 모임 이미지 */}
            <div>
              <img src="http://via.placeholder.com/300x200" alt="모임이미지" className="h-full" />
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
              <p className="text-[#cccccc] text-xs">{`* 모집기간 ${place.deadline}`}</p>

              <div className="sm:block md:hidden">
                <button className="w-full transition-all duration-300 ease-in-out bg-[#efefef] rounded-lg px-8 py-3 text-sm text-[#2e2e2e] hover:bg-[#dddddd]">
                  상세보기
                </button>
              </div>
            </div>
            <svg
              className="absolute w-[25%] h-[25%] right-[-14%] top-[33%] fill-[#ffffff] rotate-90"
              viewBox="0 0 100 100"
            >
              <polygon points="50,0 100,100 0,100" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default GatheringItem;
