import searchCoordinateToAddress from '@/utils/navermap/coordToAddress';
import initGeocoder from '@/utils/navermap/initGeocoder';
import useMapStore from '@/zustand/map.store';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useShallow } from 'zustand/react/shallow';
import { INITIAL_CENTER, INITIAL_ZOOM } from '../constants/navermap';
import getDate from '../utils/navermap/getDate';

function useMap({ searchInputRef, searchButtonRef }) {
  const [gps, setGps] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(() =>
    !window.naver
      ? null
      : new window.naver.maps.InfoWindow({
          anchorSkew: true
        })
  );
  const [selectButtonDom, setSelectButtonDom] = useState(null);
  const { selectedGeoData, setSelectedGeoData } = useMapStore(
    useShallow((state) => ({
      selectedGeoData: state.selectedGeoData,
      setSelectedGeoData: state.setSelectedGeoData
    }))
  );

  const mapRef = useRef(null);

  const initializeMap = useCallback((gps) => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...gps),
      zoom: INITIAL_ZOOM,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      zoomControl: false,
      mapTypeControl: false,
      minZoom: 8,
      tileTransition: true,
      // 확대 시 타일 변경되는 시간
      tileDuration: 400,
      // // 타일 투명도 ( 투명도 낮추면 배경 색이 보임 )
      // baseTileOpacity: 1,
      // //배경 색
      // background: 'white',
      tileSpare: 5,
      zoomControlOptions: {
        position: window.naver.maps.Position.RIGHT_TOP, // 줌 컨트롤의 위치를 우측 상단으로 배치함
        style: window.naver.maps.ZoomControlStyle.SMALL
      }
    };

    const map = new window.naver.maps.Map('map01', mapOptions);
    // setNaverMap(map);
    mapRef.current = map;

    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(...gps),
      map: map
    });
    setMarker(marker);
  }, []);

  useLayoutEffect(() => {
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
    if (gps && marker && mapRef.current) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(gps.lat, gps.long));
      marker.setPosition(new window.naver.maps.LatLng(gps.lat, gps.long));
    }
  }, [gps, marker, mapRef]);

  useEffect(() => {
    initializeMap(INITIAL_CENTER);
  }, [initializeMap]);

  useEffect(() => {
    if (!infoWindow) {
      const infoWindow = new window.naver.maps.InfoWindow({
        anchorSkew: true
      });
      setInfoWindow(infoWindow);
    }
  }, [infoWindow]);

  useEffect(() => {
    const handleSelectButtonDom = () => {
      // 선택 버튼 클릭시 동작 여기에
      console.log(selectedGeoData);
    };

    if (selectButtonDom) selectButtonDom.addEventListener('click', handleSelectButtonDom);

    return () => {
      if (selectButtonDom) selectButtonDom.removeEventListener('click', handleSelectButtonDom);
    };
  }, [selectButtonDom, selectedGeoData]);

  useEffect(() => {
    let listener = null;
    if (marker && gps && infoWindow && mapRef.current && setSelectButtonDom) {
      listener = window.naver.maps.Event.addListener(marker, 'click', () => {
        // 마커 클릭시 동작 여기에
        if (selectedGeoData) {
          console.log(selectedGeoData);
        } else {
          console.log({ lat: gps.lat, long: gps.long });
          searchCoordinateToAddress(
            infoWindow,
            mapRef.current,
            { y: gps.lat, x: gps.long },
            setSelectButtonDom,
            setSelectedGeoData
          );
        }
      });
    }

    return () => {
      if (listener) {
        window.naver.maps.Event.removeListener(listener);
      }
    };
  }, [marker, selectedGeoData, gps, infoWindow, mapRef, setSelectButtonDom, setSelectedGeoData]);

  useEffect(() => {
    if (infoWindow && mapRef.current)
      window.naver.maps.onJSContentLoaded = () =>
        initGeocoder(
          infoWindow,
          mapRef.current,
          searchInputRef.current,
          searchButtonRef.current,
          marker,
          setSelectedGeoData,
          setSelectButtonDom
        );
  }, [infoWindow, mapRef, searchInputRef, searchButtonRef, marker, setSelectedGeoData, setSelectButtonDom]);

  return { gps, naverMap: mapRef.current, infoWindow, initializeMap };
}

export default useMap;
