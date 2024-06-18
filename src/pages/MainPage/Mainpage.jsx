import useMapStore from '@/zustand/map.store';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';

function Mainpage() {
  const searchInputRef = useRef();
  const searchButtonRef = useRef();
  const { gps } = useMap({ searchInputRef, searchButtonRef });
  const { selectedGeoData } = useMapStore();

  useEffect(() => {
    console.log(`현재 위도, 경도는 => ${gps && gps.lat}, ${gps && gps.long}`);
  }, [gps]);

  useEffect(() => {
    console.log(selectedGeoData);
  }, [selectedGeoData]);

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
