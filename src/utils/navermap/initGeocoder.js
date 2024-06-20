import searchAddressToCoordinate from './addressToCoord';
import searchCoordinateToAddress from './coordToAddress';

function initGeocoder(
  infoWindow,
  map,
  searchInputRef,
  searchButtonRef,
  marker,
  setSelectedGeoData,
  setSelectButtonDom,
  user
) {
  map.addListener('click', (e) => {
    searchCoordinateToAddress(infoWindow, map, e.coord, setSelectButtonDom, setSelectedGeoData, marker, user);
    marker.setMap(map);
    marker.setPosition(e.coord);
  });

  searchInputRef.addEventListener('keydown', (e) => {
    let keyCode = e.which;
    if (keyCode === 13) {
      searchAddressToCoordinate(infoWindow, searchInputRef, map, setSelectedGeoData, setSelectButtonDom, marker, user);
    }
  });

  searchButtonRef.addEventListener('click', (e) => {
    e.preventDefault();
    searchAddressToCoordinate(infoWindow, searchInputRef, map, setSelectedGeoData, setSelectButtonDom, marker, user);
  });
}
export default initGeocoder;
