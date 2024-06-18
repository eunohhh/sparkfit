import initGeocoder from '@/utils/navermap/initGeocoder';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { INITIAL_CENTER, INITIAL_ZOOM } from '../constants/navermap';
import getDate from '../utils/navermap/getDate';

function useMap({ mapRef, markerRef }) {
  const [gps, setGps] = useState({});
  const [naverMap, setNaverMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(() => {
    if (!window.naver) return null;
    return new window.naver.maps.InfoWindow({
      anchorSkew: true
    });
  });

  const success = useCallback(async ({ coords, timestamp }) => {
    const date = getDate(timestamp);
    const gpsData = {
      lat: coords.latitude,
      long: coords.longitude,
      date: date
    };
    // console.log(gpsData)
    setGps(gpsData);
  }, []);

  function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
  }

  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('위치정보가 지원되지 않습니다');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [success]);

  const initializeMap = useCallback(() => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...INITIAL_CENTER),
      zoom: INITIAL_ZOOM,
      zoomControl: true,
      mapTypeControl: false,
      mapDataControl: false,
      minZoom: 8,
      anchorSkew: true,
      // 줌 컨트롤의 옵션
      zoomControlOptions: {
        // 줌 컨트롤의 위치를 우측 상단으로 배치함
        position: window.naver.maps.Position.TOP_RIGHT
      }
      // scaleControl: false,
      // logoControlOptions: {
      //   position: naver.maps.Position.BOTTOM_LEFT
      // }
    };
    if (!naverMap) {
      const map = new window.naver.maps.Map('map01', mapOptions);
      setNaverMap(map);
    }
    mapRef.current = naverMap;

    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(...INITIAL_CENTER),
      map: mapRef.current
    });
    markerRef.current = marker;
  }, [mapRef, markerRef, naverMap]);

  useLayoutEffect(() => {
    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  useEffect(() => {
    if (!infoWindow) {
      const infoWindow = new window.naver.maps.InfoWindow({
        anchorSkew: true
      });
      setInfoWindow(infoWindow);
    }
  }, [infoWindow]);

  useEffect(() => {
    if (infoWindow && naverMap) window.naver.maps.onJSContentLoaded = () => initGeocoder(infoWindow, naverMap);
  }, [infoWindow, naverMap]);

  return { gps, naverMap, infoWindow, initializeMap, getUserLocation };
}

export default useMap;
