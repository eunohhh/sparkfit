import { useState } from 'react';

const SearchAddressApi = () => {
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');

  const handleAddressSearch = (e) => {
    e.preventDefault();
    new daum.Postcode({
      oncomplete: function (data) {
        let addr = ''; // 주소 변수
        let extraAddr = ''; // 참고항목 변수

        if (data.userSelectedType === 'R') {
          // 도로명 주소 선택 시
          addr = data.roadAddress;
        } else {
          // 지번 주소 선택 시
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
          setExtraAddress(extraAddr);
        } else {
          setExtraAddress('');
        }

        setPostcode(data.zonecode);
        setAddress(addr);
        setDetailAddress('');
      }
    }).open();
  };

  return (
    <div>
      <input type="text" id="sample6_postcode" placeholder="우편번호" value={postcode} readOnly />
      <input type="button" onClick={handleAddressSearch} value="우편번호 찾기" />
      <br />
      <input type="text" id="sample6_address" placeholder="주소" value={address} readOnly />
      <br />
      <input
        type="text"
        id="sample6_detailAddress"
        placeholder="상세주소"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
      />
      <input type="text" id="sample6_extraAddress" placeholder="참고항목" value={extraAddress} readOnly />
    </div>
  );
};

export default SearchAddressApi;
