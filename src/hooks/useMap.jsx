import searchCoordinateToAddress from '@/utils/navermap/coordToAddress';
import initGeocoder from '@/utils/navermap/initGeocoder';
import useMapStore from '@/zustand/map.store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { INITIAL_CENTER, INITIAL_ZOOM } from '../constants/navermap';

function useMap() {
  const [searchInput, setSearchInput] = useState(null);
  const [searchButton, setSearchButton] = useState(null);
  const [basicMarker, setBasicMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(() =>
    !window.naver
      ? null
      : new window.naver.maps.InfoWindow({
          anchorSkew: true
        })
  );
  const [makeGatherButtonDom, setMakeGatherButtonDom] = useState(null);
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

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    if (searchInput && searchButton) {
      setSearchInput(searchInput);
      setSearchButton(searchButton);
    }
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

  // 마커 클릭시 동작 여기에
  useEffect(() => {
    let listener = null;
    if (basicMarker && gps && infoWindow && mapRef.current && setMakeGatherButtonDom) {
      listener = window.naver.maps.Event.addListener(basicMarker, 'click', () => {
        if (selectedGeoData) {
          console.log(selectedGeoData);
        } else {
          // console.log({ lat: gps.lat, long: gps.long });
          searchCoordinateToAddress(
            infoWindow,
            mapRef.current,
            { y: gps.lat, x: gps.long },
            setMakeGatherButtonDom,
            setSelectedGeoData,
            basicMarker
          );
        }
      });
    }
    return () => {
      if (listener) window.naver.maps.Event.removeListener(listener);
    };
  }, [basicMarker, selectedGeoData, gps, infoWindow, mapRef, setMakeGatherButtonDom, setSelectedGeoData]);

  // 정보창객체와 맵 객체가 설정되면 initGeocoder 실행
  useEffect(() => {
    // 처음에는 onsJsContentLoaded 에 등록하고 실행하고 다음부터는 등록하지 않고 실행하는 방법도 있음
    if (infoWindow && mapRef.current && basicMarker) {
      initGeocoder(
        infoWindow,
        mapRef.current,
        searchInput,
        searchButton,
        basicMarker,
        setSelectedGeoData,
        setMakeGatherButtonDom
      );
    }
  }, [infoWindow, mapRef, searchInput, searchButton, basicMarker, setSelectedGeoData, setMakeGatherButtonDom]);

  return {
    gps,
    naverMap: mapRef.current,
    infoWindow,
    basicMarker,
    makeGatherButtonDom,
    selectedGeoData,
    initializeMap
  };
}

export default useMap;
