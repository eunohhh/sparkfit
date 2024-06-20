import useMap from '@/hooks/useMap';
import usePlaces from '@/hooks/usePlaces';
import useFilterStore from '@/zustand/filter.list';
import { useCallback, useEffect, useState } from 'react';
import Loading from './Loading';
import PlaceItem from './PlaceItem';
import { calculateDistance } from '../../utils/gathering/distance';
import { useGatheringStore } from '@/zustand/gathering.store';

const GatheringItem = () => {
  const { sortedPlace, userLocation, loading, setSortedPlace, setUserLocation, setLoading } = useGatheringStore();
  const { selectedButton } = useFilterStore();
  const { places, placesLoading } = usePlaces();
  const { gps } = useMap();

  useEffect(() => {
    if (gps) {
      setUserLocation({
        latitude: gps.lat,
        longitude: gps.long
      });
    }
  }, []);

  useEffect(() => {
    if (userLocation && places) {
      let placeList = sortPlaces(places, userLocation);

      if (selectedButton === 1) {
        // 마감기한순 정렬
        placeList = placeList.sort((a, b) => a.deadline.localeCompare(b.deadline));
      } else if (selectedButton === 2) {
        // 최신등록순 정렬
        placeList = placeList.sort((a, b) => b.created_at.localeCompare(a.created_at));
      }
      setSortedPlace(placeList);
      setLoading(false);
    }
  }, [userLocation, placesLoading, selectedButton]);

  const sortPlaces = useCallback((places, userLocation) => {
    const placesWithDistance = places.map((place) => ({
      ...place,
      distance: calculateDistance(userLocation.latitude, userLocation.longitude, place.lat, place.long)
    }));

    // 거리 계산된 값 오름차순
    placesWithDistance.sort((a, b) => a.distance - b.distance);

    return placesWithDistance;
  }, []);

  return (
    <div className="flex flex-col gap-8 mb-20">
      {loading ? (
        <Loading />
      ) : (
        sortedPlace.map((place) => {
          return <PlaceItem key={place.id} place={place} />;
        })
      )}
    </div>
  );
};

export default GatheringItem;
