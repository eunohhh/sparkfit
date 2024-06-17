import searchCoordinateToAddress from './coordToAddress';

function initGeocoder(infoWindow, map) {
  map.addListener('click', function (e) {
    searchCoordinateToAddress(infoWindow, map, e.coord);
  });

  // $('#address').on('keydown', function (e) {
  //   var keyCode = e.which;

  //   if (keyCode === 13) {
  //     // Enter Key
  //     searchAddressToCoordinate($('#address').val());
  //   }
  // });

  // $('#submit').on('click', function (e) {
  //   e.preventDefault();

  //   searchAddressToCoordinate($('#address').val());
  // });

  // searchAddressToCoordinate('정자동 178-1');
}
export default initGeocoder;
