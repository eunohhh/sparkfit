const AddressInfoWindow = ({ addresses }) => (
  <div style={{ padding: '10px', minWidth: '200px', lineHeight: '150%' }}>
    <h4 style={{ marginTop: '5px' }}>검색 좌표</h4>
    <br />
    {addresses.map((address, index) => (
      <div key={index}>
        {index + 1}. {address}
      </div>
    ))}
  </div>
);

export default AddressInfoWindow;
