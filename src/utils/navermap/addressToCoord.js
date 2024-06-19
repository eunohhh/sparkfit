import SetInfoWindowContent from '@/components/navermap/SetInfoWindow';
import swal from '../sweetalert/swal';

function searchAddressToCoordinate(infoWindow, searchInputRef, map, setSelectedGeoData, setSelectButtonDom, marker) {
  const searchedValue = searchInputRef.value;

  window.naver.maps.Service.geocode(
    {
      query: searchedValue
    },
    function (status, response) {
      if (status === window.naver.maps.Service.Status.ERROR) {
        swal('error', 'Something Wrong!');
        return;
      }

      if (response.v2.meta.totalCount === 0) {
        swal('error', `검색결과가 없습니다. 결과 ${response.v2.meta.totalCount}건`);
        return;
      }

      let htmlAddresses = [],
        item = response.v2.addresses[0],
        point = new window.naver.maps.Point(item.x, item.y);

      if (item.roadAddress) {
        htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
      }

      if (item.jibunAddress) {
        htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
      }

      if (item.englishAddress) {
        htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
      }

      // item.y === lat / item.x === long
      setSelectedGeoData({
        address: {
          jibunAddress: htmlAddresses[1]?.substring(8),
          roadAddress: htmlAddresses[0]?.substring(9)
        },
        coord: { lat: Number(item.y), long: Number(item.x) }
      });

      // setInfoWindowContent 함수 호출
      const container = SetInfoWindowContent('address', searchedValue, htmlAddresses, infoWindow);

      infoWindow.setContent(container);

      infoWindow.setOptions({
        anchorSkew: true,
        borderColor: '#cecdc7',
        anchorSize: {
          width: 10,
          height: 12
        },
        maxWidth: 300
      });

      marker.setMap(map);
      marker.setPosition(point);

      map.setCenter(point);
      infoWindow.open(map, point);

      const infoWindowInnerContent = infoWindow.getContentElement();

      const infoWindowOuterContent = infoWindowInnerContent.parentNode.parentNode;

      infoWindowInnerContent.parentNode.style.width = 'fit-content';
      infoWindowInnerContent.parentNode.style.height = 'fit-content';
      infoWindowInnerContent.parentNode.style.minWidth = '300px';
      infoWindowInnerContent.parentNode.style.fontSize = '14px';

      infoWindowOuterContent.style.top = '-130px';

      setSelectButtonDom(infoWindowInnerContent.querySelector('#selectCoord'));

      searchInputRef.value = '';
    }
  );
}
export default searchAddressToCoordinate;
