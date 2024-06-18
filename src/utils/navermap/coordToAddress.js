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
          '<div class="flex flex-row justify-between"><h4 style="margin-top:5px;">검색좌표</h4><button id="selectCoord" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded">선택</button></div>',
          htmlAddresses.join('<br />'),
          '</div>'
        ].join('\n')
      );

      infoWindow.open(map, latlng);

      infoWindow.setOptions({
        anchorSize: { width: 10, height: 12 }
      });

      const infoWindowOuterContent = infoWindow.getContentElement().parentNode.parentNode;

      infoWindowOuterContent.style.top = '-32px';
      infoWindowOuterContent.style.left = '-1px';
    }
  );
}

export default searchCoordinateToAddress;
