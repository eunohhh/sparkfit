const CoordInfoWindow = ({ htmlAddresses }) => (
  <>
    <div className="flex flex-row justify-between">
      <h4 style={{ marginTop: '5px' }}>선택된 주소</h4>
      <button id="selectCoord" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded">
        선택
      </button>
    </div>
    <div
      className="w-full overflow-hidden whitespace-nowrap text-ellipsis"
      dangerouslySetInnerHTML={{ __html: htmlAddresses.join('<br />') }}
    />
  </>
);

export default CoordInfoWindow;
