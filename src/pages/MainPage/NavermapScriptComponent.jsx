import swal from '@/utils/sweetalert/swal';
import useMapStore from '@/zustand/map.store';
import { Suspense, lazy, useLayoutEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Mainpage from './Mainpage';

const ExternalComponent = lazy(() => {
  return new Promise((resolve) => {
    // 외부 스크립트를 동적으로 추가
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
      import.meta.env.VITE_NCP_CLIENT_ID
    }&submodules=geocoder`;
    script.async = true;
    script.onload = () => {
      // 스크립트가 로드된 후에 window.naver가 정의된 것을 확인
      if (window.naver) {
        console.log('Naver Maps script loaded:', window.naver);
        resolve({
          default: () => <Mainpage />
        });
      } else {
        console.error('Naver Maps script loaded, but window.naver is undefined');
      }
    };
    script.onerror = () => {
      console.error('Failed to load Naver Maps script');
    };
    document.body.appendChild(script);
  });
});

function NavermapScriptComponent() {
  const { userGps, setUserGps: setGps } = useMapStore(
    useShallow((state) => ({ userGps: state.userGps, setUserGps: state.setUserGps }))
  );

  // 초기에 사용자의 위치 정보를 가져옴
  useLayoutEffect(() => {
    // console.log('초기 gps =>', userGps);
    if (userGps) return;
    const success = ({ coords }) => {
      const gpsData = {
        lat: coords.latitude,
        long: coords.longitude
      };
      setGps(gpsData);
    };

    const error = (err) => {
      if (err.code === err.PERMISSION_DENIED) {
        swal('warning', '위치 정보를 제공하지 않으면 일부 기능을 사용할 수 없습니다.');
        return;
      } else {
        swal('error', '위치 정보를 가져오는 중 오류가 발생했습니다.');
        return;
      }
    };
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        swal('error', '위치정보가 지원되지 않습니다');
        return;
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    };
    getUserLocation();
  }, [setGps, userGps]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExternalComponent />
    </Suspense>
  );
}

export default NavermapScriptComponent;
