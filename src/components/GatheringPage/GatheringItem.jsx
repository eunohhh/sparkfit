import useFilterStore from '@/zustand/filter.list';
import React, { useEffect, useState } from 'react';
import PlaceItem from './PlaceItem';
import usePlaces from '@/hooks/usePlaces';

const GatheringItem = () => {
  const { selectedButton } = useFilterStore();
  const { places, placesLoading } = usePlaces();
  const [sortedPlace, setSortedPlace] = useState([]);

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

  useEffect(() => {
    if (places) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        const sortedPlace = places
          .map((place) => ({
            ...place,
            distance: calculateDistance(userLatitude, userLongitude, place.lat, place.long)
          }))
          .sort((a, b) => a.distance - b.distance);

        console.log('sortedPlace', sortedPlace);
        setSortedPlace(sortedPlace);

        if (selectedButton === 1) {
          //마감기한순 정렬
          sortedPlace.sort((a, b) => a.deadline.localeCompare(b.deadline));
        } else if (selectedButton === 2) {
          //최신등록순 정렬
          sortedPlace.sort((a, b) => b.created_at.localeCompare(a.created_at));
        }
      });
    } else {
      console.error('모임 데이터를 가지고오지 못했습니다.', error);
    }
  }, [places, selectedButton]);

  if (placesLoading) {
    return (
      <div className="text-[#92B6D7] text-xl font-bold absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
        🏃🏻🏃🏻‍♀️🏃🏻‍♂️ 데이터를 가지고 오고 있어요
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 mb-20">
      {sortedPlace.map((place) => {
        return <PlaceItem key={place.id} place={place} />;
      })}
    </div>
  );
};

export default GatheringItem;
