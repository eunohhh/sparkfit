import ReactDOM from 'react-dom/client';
import AddressInfoWindow from './AddressInfoWindow';
import InfoWindow from './InfoWindow';
import CoordInfoWindow from './SelectInfoWindow';

function SetInfoWindowContent(type, searchedValue, htmlAddresses, infoWindow, place = null) {
  // 임시 컨테이너 생성
  const container = document.createElement('div');

  container.style.padding = '10px';
  container.style.width = '100%';
  container.style.height = 'auto';
  container.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 4px 16px 0px';

  // React 컴포넌트를 임시 컨테이너에 렌더링
  const root = ReactDOM.createRoot(container);
  if (type === 'address') {
    root.render(
      <AddressInfoWindow searchedValue={searchedValue} htmlAddresses={htmlAddresses} infoWindow={infoWindow} />
    );
  } else if (type === 'coord') {
    root.render(<CoordInfoWindow htmlAddresses={htmlAddresses} infoWindow={infoWindow} />);
  } else if (type === 'place') {
    root.render(<InfoWindow place={place} infoWindow={infoWindow} />);
  }

  return container;
}

export default SetInfoWindowContent;
