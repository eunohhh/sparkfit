const AddressInfoWindow = ({ searchedValue, htmlAddresses, infoWindow }) => {
  const handleCloseButton = () => {
    infoWindow.close();
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <h4>검색 주소 : {searchedValue}</h4>
        <div className="flex flex-row gap-1">
          <button id="selectCoord" className="bg-btn-blue hover:bg-blue-400 text-white font-bold py-0.5 px-2 rounded">
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
      <div
        className="w-full pt-2 overflow-hidden whitespace-nowrap text-ellipsis"
        dangerouslySetInnerHTML={{ __html: htmlAddresses.join('<br />') }}
      />
    </>
  );
};

export default AddressInfoWindow;
