import makeAddress from './makeAddress';

function searchCoordinateToAddress(infoWindow, map, latlng) {
  infoWindow.close();
  window.naver.maps.Service.reverseGeocode(
    {
      coords: latlng,
      orders: [window.naver.maps.Service.OrderType.ADDR, window.naver.maps.Service.OrderType.ROAD_ADDR].join(',')
    },
    function (status, response) {
      if (status === window.naver.maps.Service.Status.ERROR) {
        return alert('Something Wrong!');
      }

      let items = response.v2.results,
        address = '',
        htmlAddresses = [];

      for (let i = 0, ii = items.length, item, addrType; i < ii; i++) {
        item = items[i];
        address = makeAddress(item) || '';
        addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

        htmlAddresses.push(i + 1 + '. ' + addrType + ' ' + address);
      }

      infoWindow.setContent(
        [
          '<div style="padding:10px;min-width:200px;line-height:150%;">',
          '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
          htmlAddresses.join('<br />'),
          '</div>'
        ].join('\n')
      );

      infoWindow.open(map, latlng);
    }
  );
}

export default searchCoordinateToAddress;
