import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { INITIAL_CENTER, INITIAL_ZOOM } from '../../constants/navermap';
import getDate from '../../utils/getDate';

function Mainpage() {
  const mapRef = useRef();
  const markerRef = useRef();

  const [gps, setGps] = useState({});

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

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...INITIAL_CENTER),
      zoom: INITIAL_ZOOM,
      zoomControl: true,
      mapTypeControl: false,
      mapDataControl: false,
      minZoom: 8,
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
    //새로운 네이버 맵 인스턴스 생성
    const map = new window.naver.maps.Map('map01', mapOptions);
    mapRef.current = map;

    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(...INITIAL_CENTER),
      map: mapRef.current
    });
    markerRef.current = marker;
  };

  useLayoutEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return (
    <div className="flex">
      <div>
        <div>현재 위도는 {gps && gps.lat}</div>
        <div>현재 경도는 {gps && gps.long}</div>
      </div>
      <div id="map01" className="h-dvh w-dvw" ref={mapRef} />
    </div>
  );
}

export default Mainpage;
