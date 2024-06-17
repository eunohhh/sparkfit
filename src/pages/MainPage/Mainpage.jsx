import { useRef } from 'react';
import useMap from '../../hooks/useMap';

function Mainpage() {
  const mapRef = useRef();
  const markerRef = useRef();

  const { gps } = useMap({ mapRef, markerRef });

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
