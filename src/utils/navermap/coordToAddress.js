import swal from '../sweetalert/swal';
import makeAddress from './makeAddress';

function searchCoordinateToAddress(infoWindow, map, latlng, setSelectButtonDom, setSelectedGeoData) {
  infoWindow.close();
  window.naver.maps.Service.reverseGeocode(
    {
      coords: latlng,
      orders: [window.naver.maps.Service.OrderType.ADDR, window.naver.maps.Service.OrderType.ROAD_ADDR].join(',')
    },
    function (status, response) {
      if (status === window.naver.maps.Service.Status.ERROR) {
        swal('error', 'Something Wrong!');
        return;
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
          '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
          '<div class="flex flex-row justify-between"><h4 style="margin-top:5px;">검색좌표</h4><button id="selectCoord" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded">선택</button></div>',
          htmlAddresses.join('<br />'),
          '</div>'
        ].join('\n')
      );

      infoWindow.open(map, latlng);

      //11 ,12

      setSelectedGeoData({
        address: {
          jibunAddress: htmlAddresses[0]?.substring(11),
          roadAddress: htmlAddresses[1]?.substring(12)
        },
        coord: { lat: latlng.y, long: latlng.x }
      });

      infoWindow.setOptions({
        anchorSkew: true,
        borderColor: '#cecdc7',
        anchorSize: {
          width: 10,
          height: 12
        }
      });

      const infoWindowInnerContent = infoWindow.getContentElement();

      const infoWindowOuterContent = infoWindowInnerContent.parentNode.parentNode;

      infoWindowOuterContent.style.top = '-32px';
      infoWindowOuterContent.style.left = '-1px';

      setSelectButtonDom(infoWindowInnerContent.querySelector('#selectCoord'));
    }
  );
}

export default searchCoordinateToAddress;
