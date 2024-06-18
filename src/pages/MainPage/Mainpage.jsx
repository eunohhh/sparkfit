import usePlaces from '@/hooks/usePlaces';
import useMapStore from '@/zustand/map.store';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';

function Mainpage() {
  const searchInputRef = useRef();
  const searchButtonRef = useRef();
  const { gps, naverMap } = useMap({ searchInputRef, searchButtonRef });
  const { selectedGeoData } = useMapStore((state) => ({ selectedGeoData: state.selectedGeoData }));
  const { places } = usePlaces();

  useEffect(() => {
    console.log(`현재 위도, 경도는 => ${gps && gps.lat}, ${gps && gps.long}`);
  }, [gps]);

  useEffect(() => {
    console.log(selectedGeoData);
  }, [selectedGeoData]);

  useEffect(() => {
    if (places && naverMap) {
      // 마커 리스트와 정보창 리스트 선언
      const markers = [];
      const infoWindows = [];
      places.forEach((place) => {
        const marker = new window.naver.maps.Marker({
          // 생성될 마커의 위치
          position: new window.naver.maps.LatLng(place.lat, place.long),
          // 마커를 표시할 Map 객체
          map: naverMap
        });

        // 정보창 객체
        const infoWindow = new window.naver.maps.InfoWindow({
          content: [
            '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
            `   <div style="font-weight: bold; margin-bottom: 5px;">${place.sports_name}</div>`,
            `   <div style="font-size: 13px;">${place.texts}<div>`,
            '</div>'
          ].join(''),
          maxWidth: 300,
          anchorSize: {
            width: 10,
            height: 12
          },
          borderColor: '#cecdc7'
        });

        markers.push(marker);
        infoWindows.push(infoWindow);
      });

      // 마커 리스트와 정보창 리스트 추가
      markers.forEach((marker, idx) => {
        marker.addListener('click', () => infoWindows[idx].open(naverMap, marker));
      });
    }
  }, [places, naverMap]);

  return (
    <section className="relative flex w-dvw h-dvh">
      <form className="absolute z-10 flex items-center gap-1 rounded-lg bg-white p-1 border border-gray-300 box-border left-20 ml-1">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-[3px] px-2"
          ref={searchInputRef}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded"
          ref={searchButtonRef}
        >
          위치검색
        </button>
      </form>
      <div id="map01" className="h-full w-full" />
    </section>
  );
}

export default Mainpage;
