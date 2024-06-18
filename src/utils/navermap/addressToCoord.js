import Swal from 'sweetalert2';

function searchAddressToCoordinate(infoWindow, searchInputRef, map, setSelectedGeoData, setSelectButtonDom, marker) {
  window.naver.maps.Service.geocode(
    {
      query: searchInputRef.value
    },
    function (status, response) {
      if (status === window.naver.maps.Service.Status.ERROR) {
        return alert('Something Wrong!');
      }

      if (response.v2.meta.totalCount === 0) {
        Swal.fire({
          title: 'Oops!',
          text: `검색결과가 없습니다. 결과 ${response.v2.meta.totalCount}건`,
          icon: 'error'
        });
        return;
      }

      let htmlAddresses = [],
        item = response.v2.addresses[0],
        point = new window.naver.maps.Point(item.x, item.y);

      // item.y === lat / item.x === long
      setSelectedGeoData({
        address: {
          jibunAddress: htmlAddresses[0],
          roadAddress: htmlAddresses[1]
        },
        coord: { lat: Number(item.y), long: Number(item.x) }
      });

      if (item.roadAddress) {
        htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
      }

      if (item.jibunAddress) {
        htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
      }

      if (item.englishAddress) {
        htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
      }

      infoWindow.setContent(
        [
          '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
          '<div class="flex flex-row justify-between"><h4 style="margin-top:5px;">검색 주소 : ' +
            searchInputRef +
            '</h4><button id="selectCoord" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded">선택</button></div>',
          htmlAddresses.join('<br />'),
          '</div>'
        ].join('\n')
      );

      infoWindow.setOptions({
        anchorSkew: true,
        borderColor: '#cecdc7',
        anchorSize: {
          width: 10,
          height: 12
        }
      });

      marker.setMap(map);
      marker.setPosition(point);

      map.setCenter(point);
      infoWindow.open(map, point);

      const infoWindowInnerContent = infoWindow.getContentElement();

      const infoWindowOuterContent = infoWindowInnerContent.parentNode.parentNode;

      infoWindowOuterContent.style.top = '-32px';
      infoWindowOuterContent.style.left = '-1px';

      setSelectButtonDom(infoWindowInnerContent.querySelector('#selectCoord'));

      searchInputRef.value = '';
    }
  );
}
export default searchAddressToCoordinate;
