import initGeocoder from '@/utils/navermap/initGeocoder';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { INITIAL_CENTER, INITIAL_ZOOM } from '../constants/navermap';
import getDate from '../utils/navermap/getDate';

function useMap({ mapRef, searchInputRef, searchButtonRef }) {
  const [gps, setGps] = useState(null);
  const [naverMap, setNaverMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(() => {
    if (!window.naver) return null;
    return new window.naver.maps.InfoWindow({
      anchorSkew: true
    });
  });
  const [selectedAddress, setSelectedAddress] = useState(null);

  const initializeMap = useCallback(
    (gps) => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(...gps),
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
      } else {
        naverMap.setCenter(new window.naver.maps.LatLng(...gps));
      }
      mapRef.current = naverMap;

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(...gps),
        map: mapRef.current
      });
      setMarker(marker);
    },
    [mapRef, naverMap]
  );

  useEffect(() => {
    function getUserLocation() {
      if (!navigator.geolocation) {
        Swal.fire({
          title: '에러',
          text: '위치정보가 지원되지 않습니다',
          icon: 'error'
        });
        return;
      } else {
        navigator.geolocation.getCurrentPosition(
          async ({ coords, timestamp }) => {
            const date = getDate(timestamp);
            const gpsData = {
              lat: coords.latitude,
              long: coords.longitude,
              date: date
            };
            setGps(gpsData);
          },
          (err) => {
            if (err.code === err.PERMISSION_DENIED) {
              Swal.fire({
                title: '위치 정보 제공 거부',
                text: '위치 정보를 제공하지 않으면 일부 기능을 사용할 수 없습니다.',
                icon: 'warning'
              });
            } else {
              Swal.fire({
                title: '에러',
                text: '위치 정보를 가져오는 중 오류가 발생했습니다.',
                icon: 'error'
              });
            }
          }
        );
      }
    }
    getUserLocation();
  }, []);

  useEffect(() => {
    if (gps) {
      initializeMap([gps.lat, gps.long]);
    } else {
      initializeMap(INITIAL_CENTER);
    }
  }, [gps, initializeMap]);

  useEffect(() => {
    if (!infoWindow) {
      const infoWindow = new window.naver.maps.InfoWindow({
        anchorSkew: true
      });
      setInfoWindow(infoWindow);
    }
  }, [infoWindow]);

  useEffect(() => {
    if (infoWindow && naverMap)
      window.naver.maps.onJSContentLoaded = () =>
        initGeocoder(infoWindow, naverMap, searchInputRef.current, searchButtonRef.current, marker, setSelectedAddress);
  }, [infoWindow, naverMap, searchInputRef, searchButtonRef, marker]);

  useEffect(() => {
    console.log(selectedAddress);
  }, [selectedAddress]);

  return { gps, naverMap, infoWindow, initializeMap };
}

export default useMap;
