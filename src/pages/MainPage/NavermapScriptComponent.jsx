import { Suspense, lazy } from 'react';
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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExternalComponent />
    </Suspense>
  );
}

export default NavermapScriptComponent;
