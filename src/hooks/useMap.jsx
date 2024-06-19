import searchCoordinateToAddress from '@/utils/navermap/coordToAddress';
import initGeocoder from '@/utils/navermap/initGeocoder';
import useMapStore from '@/zustand/map.store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { INITIAL_CENTER, INITIAL_ZOOM } from '../constants/navermap';

function useMap({ searchInputRef, searchButtonRef }) {
  const [basicMarker, setBasicMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(() =>
    !window.naver
      ? null
      : new window.naver.maps.InfoWindow({
          anchorSkew: true
        })
  );
  const [selectButtonDom, setSelectButtonDom] = useState(null);
  const {
    selectedGeoData,
    setSelectedGeoData,
    userGps: gps
  } = useMapStore(
    useShallow((state) => ({
      selectedGeoData: state.selectedGeoData,
      setSelectedGeoData: state.setSelectedGeoData,
      userGps: state.userGps
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
    setBasicMarker(marker);
  }, []);

  // 최초 실행
  useEffect(() => {
    initializeMap(INITIAL_CENTER);
  }, [initializeMap]);

  // 사용자 gps 값 저장 성공시 실행
  useEffect(() => {
    if (gps && basicMarker && mapRef.current) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(gps.lat, gps.long));
      basicMarker.setPosition(new window.naver.maps.LatLng(gps.lat, gps.long));
    }
  }, [gps, basicMarker, mapRef]);

  // 기본 정보창 객체 생성
  useEffect(() => {
    if (!infoWindow) {
      const infoWindow = new window.naver.maps.InfoWindow();
      setInfoWindow(infoWindow);
    }
  }, [infoWindow]);

  // 선택 버튼 클릭시 동작 여기에
  useEffect(() => {
    const handleSelectButtonDom = () => {
      console.log(selectedGeoData);
    };

    if (selectButtonDom) selectButtonDom.addEventListener('click', handleSelectButtonDom);

    return () => {
      if (selectButtonDom) selectButtonDom.removeEventListener('click', handleSelectButtonDom);
    };
  }, [selectButtonDom, selectedGeoData]);

  // 마커 클릭시 동작 여기에
  useEffect(() => {
    let listener = null;
    if (basicMarker && gps && infoWindow && mapRef.current && setSelectButtonDom) {
      listener = window.naver.maps.Event.addListener(basicMarker, 'click', () => {
        if (selectedGeoData) {
          console.log(selectedGeoData);
        } else {
          // console.log({ lat: gps.lat, long: gps.long });
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
      if (listener) window.naver.maps.Event.removeListener(listener);
    };
  }, [basicMarker, selectedGeoData, gps, infoWindow, mapRef, setSelectButtonDom, setSelectedGeoData]);

  // 정보창객체와 맵 객체가 설정되면 initGeocoder 실행
  useEffect(() => {
    if (infoWindow && mapRef.current)
      window.naver.maps.onJSContentLoaded = () =>
        initGeocoder(
          infoWindow,
          mapRef.current,
          searchInputRef.current,
          searchButtonRef.current,
          basicMarker,
          setSelectedGeoData,
          setSelectButtonDom
        );
  }, [infoWindow, mapRef, searchInputRef, searchButtonRef, basicMarker, setSelectedGeoData, setSelectButtonDom]);

  return { gps, naverMap: mapRef.current, infoWindow, basicMarker, initializeMap };
}

export default useMap;
