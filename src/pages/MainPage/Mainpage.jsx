import CreateGroupModal from '@/components/DetailPage/CreateGroupModal';

import SetInfoWindowContent from '@/components/navermap/SetInfoWindow';
import usePlaces from '@/hooks/usePlaces';
import checkForMarkersRendering from '@/utils/navermap/checkForMarkersRendering';
import isMobile from '@/utils/navermap/isMobile';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMap from '../../hooks/useMap';

function Mainpage({ user = null, contracts = [] }) {
  const navigate = useNavigate();
  const searchInputRef = useRef();
  const searchButtonRef = useRef();
  const [openCreateGroupModal, setCreateGroupModal] = useState(false);
  const { naverMap, basicMarker, infoWindow, makeGatherButtonDom } = useMap();
  const { places } = usePlaces();
  const queryClient = useQueryClient();

  const prevPlacesRef = useRef(null);
  const allInfoWindowsRef = useRef(null);
  const allMarkersRef = useRef(null);

  const handleModalClose = async () => {
    setCreateGroupModal((prev) => !prev);
    await queryClient.invalidateQueries({ queryKey: ['places'] });
    if (infoWindow) infoWindow.close();
    setTimeout(() => {
      if (prevPlacesRef.current.length !== places.length) {
        allInfoWindowsRef.current[0].open(naverMap, allMarkersRef.current[0]);
        allMarkersRef.current[0].setMap(naverMap);

        const infoWindowInnerContent = allInfoWindowsRef.current[0].getContentElement();
        const infoWindowOuterContent = infoWindowInnerContent.parentNode.parentNode;

        infoWindowInnerContent.parentNode.style.width = 'fit-content';
        infoWindowInnerContent.parentNode.style.height = 'fit-content';
        infoWindowInnerContent.parentNode.style.minWidth = isMobile() ? '250px' : '370px';
        infoWindowInnerContent.parentNode.style.maxWidth = isMobile() ? '250px' : '370px';
        infoWindowInnerContent.parentNode.style.fontSize = isMobile() ? '9px' : '14px';

        infoWindowOuterContent.style.top =
          infoWindowInnerContent.getBoundingClientRect().height < 81 ? '-96px' : '-110px';
      }
    }, 0);
  };

  useEffect(() => {
    if (places && naverMap && user && contracts) {
      prevPlacesRef.current = places;
      // 마커 리스트와 정보창 리스트 선언
      const markers = [];
      const infoWindows = [];

      for (const place of places) {
        const marker = new window.naver.maps.Marker({
          // 생성될 마커의 위치
          position: new window.naver.maps.LatLng(place.lat, place.long),
          // 마커를 표시할 Map 객체
          map: naverMap
          // animation: window.naver.maps.Animation.BOUNCE
        });

        // 정보창 객체
        const infoWindow = new window.naver.maps.InfoWindow({
          maxWidth: 300,
          anchorSize: {
            width: 10,
            height: 12
          },
          borderColor: '#cecdc7'
        });

        // setInfoWindowContent 함수 호출
        const container = SetInfoWindowContent('place', '', '', infoWindow, place, navigate, marker, user, contracts);

        infoWindow.setContent(container);

        setTimeout(() => {
          const infoWindowInnerContent = infoWindow.getContentElement();

          infoWindowInnerContent.parentNode.style.width = 'fit-content';
          infoWindowInnerContent.parentNode.style.height = 'fit-content';
          // infoWindowInnerContent.parentNode.style.maxHeight = '100px';
          infoWindowInnerContent.parentNode.style.minWidth = isMobile() ? '250px' : '440px';
          infoWindowInnerContent.parentNode.style.maxWidth = isMobile() ? '250px' : '440px';
          infoWindowInnerContent.parentNode.style.fontSize = isMobile() ? '9px' : '14px';
        }, 0);

        marker.place = place;

        markers.push(marker);
        infoWindows.push(infoWindow);
      }

      allMarkersRef.current = markers;
      allInfoWindowsRef.current = infoWindows;

      // 마커 리스트와 정보창 리스트 추가
      markers.forEach((marker, idx) => {
        marker.addListener('click', () => {
          if (basicMarker) basicMarker.setMap(null);
          infoWindows[idx].open(naverMap, marker);
          naverMap.panTo(new window.naver.maps.LatLng(marker.position._lat, marker.position._lng), { duration: 200 });
        });
      });

      // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
      window.naver.maps.Event.addListener(naverMap, 'zoom_changed', () => {
        if (naverMap !== null) {
          checkForMarkersRendering(naverMap, markers);
        }
      });

      // 지도 드래그 시 마커 업데이트 이벤트 핸들러
      window.naver.maps.Event.addListener(naverMap, 'dragend', () => {
        if (naverMap !== null) {
          checkForMarkersRendering(naverMap, markers);
        }
      });
    }
  }, [places, naverMap, basicMarker, navigate, user, contracts]);

  // 모임만들기 버튼 클릭시 동작 여기에
  useEffect(() => {
    const handleSelectButtonDom = () => setCreateGroupModal((prev) => !prev);

    if (makeGatherButtonDom) makeGatherButtonDom.addEventListener('click', handleSelectButtonDom);

    return () => {
      if (makeGatherButtonDom) makeGatherButtonDom.removeEventListener('click', handleSelectButtonDom);
    };
  }, [makeGatherButtonDom]);

  return (
    <>
      {openCreateGroupModal && <CreateGroupModal close={handleModalClose} />}
      <section className="relative flex w-dvw h-dvh">
        <form className="sm:left-[15%] md:left-[10%] lg:left-[7%] absolute z-10 flex items-center gap-1 rounded-lg bg-white p-1 border border-gray-300 box-border left-5 top-5 ml-1">
          <input
            type="text"
            id="search-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-[3px] px-2"
            ref={searchInputRef}
            placeholder="위치를 입력해주세요."
          />
          <button
            type="submit"
            id="search-button"
            className="bg-btn-blue hover:bg-blue-4000 text-white font-bold py-1 px-3 rounded text-xs"
            ref={searchButtonRef}
          >
            위치검색
          </button>
        </form>
        <div id="map01" className="h-full w-full" />
      </section>
    </>
  );
}

export default Mainpage;
