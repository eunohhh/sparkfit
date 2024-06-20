import useFilterStore from '@/zustand/filter.list';
import React, { useCallback, useEffect, useState } from 'react';
import PlaceItem from './PlaceItem';
import usePlaces from '@/hooks/usePlaces';
import Loading from './Loading';

const GatheringItem = () => {
  const { selectedButton } = useFilterStore();
  const { places, placesLoading } = usePlaces();
  const [sortedPlace, setSortedPlace] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  console.log('places', places);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error('사용자의 위치를 가져오지 못했습니다.:', error);
      }
    );
  }, []);

  const sortPlaces = useCallback((places, userLocation) => {
    const placesWithDistance = places.map((place) => ({
      ...place,
      distance: calculateDistance(userLocation.latitude, userLocation.longitude, place.lat, place.long)
    }));

    // 거리 계산된 값 오름차순
    placesWithDistance.sort((a, b) => a.distance - b.distance);

    return placesWithDistance;
  }, []);

  useEffect(() => {
    console.log('selectedButton', selectedButton);
    if (userLocation && places) {
      const placeList = sortPlaces(places, userLocation);

      setSortedPlace(placeList);
    }
  }, [userLocation, placesLoading]);

  useEffect(() => {
    const newSorted = [...sortedPlace];
    if (selectedButton === 1) {
      // 마감기한순 정렬
      newSorted.sort((a, b) => a.deadline.localeCompare(b.deadline));
      setSortedPlace(newSorted);
    } else if (selectedButton === 2) {
      // 최신등록순 정렬
      newSorted.sort((a, b) => b.created_at.localeCompare(a.created_at));
      setSortedPlace(newSorted);
    } else if (selectedButton === 0) {
      const newSorted = sortPlaces(places, userLocation);
      setSortedPlace(newSorted);
    }
  }, [selectedButton]);

  if (placesLoading) {
    return <Loading />;
  }

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
      {sortedPlace.map((place) => {
        return <PlaceItem key={place.id} place={place} />;
      })}
    </div>
  );
};

export default GatheringItem;