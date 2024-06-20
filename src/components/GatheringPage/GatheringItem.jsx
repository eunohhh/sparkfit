import useFilterStore from '@/zustand/filter.list';
import React, { useEffect, useState } from 'react';
import PlaceItem from './PlaceItem';
import usePlaces from '@/hooks/usePlaces';
import Loading from './Loading';
import useMapStore from '@/zustand/map.store';

const GatheringItem = () => {
  const { selectedButton } = useFilterStore();
  const { places, placesLoading } = usePlaces();
  const [sortedPlace, setSortedPlace] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const { userGps } = useMapStore();

  console.log(userGps);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }, []);

  useEffect(() => {
    if (userLocation && places) {
      const sortedPlace = sortPlaces(places, userLocation, selectedButton);
      setSortedPlace(sortedPlace);

      if (selectedButton === 1) {
        // 마감기한순 정렬
        sortedPlace.sort((a, b) => a.deadline.localeCompare(b.deadline));
      } else if (selectedButton === 2) {
        // 최신등록순 정렬
        sortedPlace.sort((a, b) => b.created_at.localeCompare(a.created_at));
      }
      setSortedPlace(sortedPlace);
    }
  }, [userLocation, places, selectedButton]);

  const sortPlaces = (places, userLocation, selectedButton) => {
    return places
      .map((place) => ({
        ...place,
        distance: calculateDistance(userLocation.latitude, userLocation.longitude, place.lat, place.long)
      }))
      .sort((a, b) => a.distance - b.distance)
      .sort((a, b) => {
        if (selectedButton === 1) {
          // 마감기한순 정렬
          return a.deadline.localeCompare(b.deadline);
        } else if (selectedButton === 2) {
          // 최신등록순 정렬
          return b.created_at.localeCompare(a.created_at);
        }
      });
  };

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

  if (placesLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-8 mb-20">
      <p>
        사용자 위치: {userGps?.latitude}, {userGps?.longitude}
      </p>
      {sortedPlace.map((place) => {
        return <PlaceItem key={place.id} place={place} />;
      })}
    </div>
  );
};

export default GatheringItem;
