import supabase from '@/supabase';
import useFilterStore from '@/zustand/filter.list';
import React, { useEffect, useState } from 'react';
import PlaceItem from './PlaceItem';

const GatheringItem = () => {
  const [places, setPlaces] = useState([]);
  const { selectedButton } = useFilterStore();

  useEffect(() => {
    const fetchPlace = async () => {
      const { data: placeData, error } = await supabase.from('Places').select('*');

      if (placeData) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;

          const sortedPlace = placeData
            .map((place) => ({
              ...place,
              distance: calculateDistance(userLatitude, userLongitude, place.lat, place.long)
            }))
            .sort((a, b) => a.distance - b.distance);

          setPlaces(sortedPlace);

          if (selectedButton === 1) {
            //마감기한순 정렬
            return sortedPlace.sort((a, b) => a.deadline.localeCompare(b.deadline));
          }
        });
      } else {
        console.error('모임 데이터를 가지고오지 못했습니다.', error);
      }
    };
    fetchPlace();
  }, [selectedButton]);

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

  return (
    <div className="flex flex-col gap-8 mb-20">
      {places.map((place) => {
        return <PlaceItem key={place.id} place={place} />;
      })}
    </div>
  );
};

export default GatheringItem;
