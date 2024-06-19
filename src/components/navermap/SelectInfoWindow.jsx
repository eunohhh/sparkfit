const CoordInfoWindow = ({ htmlAddresses, infoWindow }) => {
  const handleCloseButton = () => {
    infoWindow.close();
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <h4 className="mt-2">선택된 주소</h4>
        <div className="flex flex-row gap-1">
          <button id="selectCoord" className="bg-btn-blue hover:bg-blue-400 text-white font-bold py-0.5 px-2 rounded">
            선택
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
      <div
        className="w-full overflow-hidden whitespace-nowrap text-ellipsis"
        dangerouslySetInnerHTML={{ __html: htmlAddresses.join('<br />') }}
      />
    </>
  );
};

export default CoordInfoWindow;
