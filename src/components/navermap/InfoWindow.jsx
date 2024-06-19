import useMapStore from '@/zustand/map.store';

function InfoWindow({ place, infoWindow, navigate }) {
  const { setUserGps: setGps } = useMapStore((state) => ({ setUserGps: state.setUserGps }));

  const handleCloseButton = () => {
    infoWindow.close();
  };

  const handleJoinButton = () => {
    // detail/:id 로 navigate 하여 place.id 보내기
    const gpsData = {
      lat: place.lat,
      long: place.long
    };
    setGps(gpsData);
    navigate(`/detail/${place.id}`);
  };

  return (
    <>
      <div className="flex flex-row justify-between text-sm">
        <h4>{place.sports_name}</h4>
        <div className="flex flex-row gap-1">
          <button
            onClick={handleJoinButton}
            id="makeGathering"
            className="bg-btn-blue hover:bg-blue-400 text-white font-bold py-0.5 px-2 rounded"
          >
            모임참여하기
          </button>
          <button
            id="closeCoord"
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-0.5 px-2 rounded"
            onClick={handleCloseButton}
          >
            닫기
          </button>
        </div>
      </div>
      <div className="w-full pt-2 text-sm">
        <h4 className="text-lg py-2">{place.gather_name}</h4>
        <p>{place.texts}</p>
      </div>
    </>
  );
}

export default InfoWindow;
