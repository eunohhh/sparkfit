import useFilterStore from '@/zustand/filter.list';
import React, { useEffect, useState } from 'react';
import PlaceItem from './PlaceItem';
import usePlaces from '@/hooks/usePlaces';

const GatheringItem = () => {
  //const [places, setPlaces] = useState([]);
  const { selectedButton } = useFilterStore();
  const { places, placesLoading } = usePlaces();

  console.log(places);

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

        if (selectedButton === 1) {
          //마감기한순 정렬
          sortedPlace.sort((a, b) => a.deadline.localeCompare(b.deadline));
        }
      });
    } else {
      console.error('모임 데이터를 가지고오지 못했습니다.', error);
    }
  }, [places, selectedButton]);

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
