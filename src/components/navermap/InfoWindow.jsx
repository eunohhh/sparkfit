function InfoWindow({ place, infoWindow }) {
  const handleCloseButton = () => {
    infoWindow.close();
  };

  return (
    <>
      <div className="flex flex-row justify-between text-sm">
        <h4>{place.sports_name}</h4>
        <div className="flex flex-row gap-1">
          <button id="makeGathering" className="bg-btn-blue hover:bg-blue-400 text-white font-bold py-0.5 px-2 rounded">
            모임만들기
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
      <div className="w-full pt-2 text-sm">${place.texts}</div>
    </>
  );
}

export default InfoWindow;
