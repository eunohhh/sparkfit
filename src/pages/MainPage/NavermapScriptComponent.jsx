import { Suspense, lazy } from 'react';
import Mainpage from './Mainpage';

const ExternalComponent = lazy(() => {
  return new Promise((resolve) => {
    // 외부 스크립트를 동적으로 추가
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_NCP_CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      // 스크립트가 로드된 후에 필요한 컴포넌트를 반환
      resolve({
        default: () => <Mainpage />
      });
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
