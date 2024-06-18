import searchAddressToCoordinate from './addressToCoord';
import searchCoordinateToAddress from './coordToAddress';

function initGeocoder(infoWindow, map, searchInputRef, searchButtonRef, markerRef, setSelectedAddress) {
  if (!infoWindow || !map) return;
  // if (!window.naver.maps.Service) return;

  map.addListener('click', (e) => {
    searchCoordinateToAddress(infoWindow, map, e.coord);
    setSelectedAddress({ lat: e.coord.y, long: e.coord.x });
    markerRef.setPosition(e.coord);
  });

  searchInputRef.addEventListener('keydown', (e) => {
    let keyCode = e.which;
    if (keyCode === 13) searchAddressToCoordinate(infoWindow, searchInputRef.value, map, setSelectedAddress);
  });

  searchButtonRef.addEventListener('click', (e) => {
    e.preventDefault();
    searchAddressToCoordinate(infoWindow, searchInputRef.value, map, setSelectedAddress);
  });
}
export default initGeocoder;
