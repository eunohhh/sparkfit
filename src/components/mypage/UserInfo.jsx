import React from 'react';
import { STSection } from '../../pages/MyPage';
import styled from 'styled-components';
import Ellipse1 from '../../styles/image/Ellipse1.png';

const UserInfo = () => {
  return (
    <STSection>
      <STUserWrap>
        <div>
          <STImage src={Ellipse1} alt="profile-img" />
          <label htmlFor="progileImageBtn">
            {/* div를이미지로바꿀것임 */}
            <div>프로필변경이미지버튼</div>
          </label>
          <input type="file" className="hidden" accept="image/*" id="progileImageBtn" />
        </div>
        <div>
          <div className="flex mt-5">닉네임 님 반갑습니다.</div>
          <div className="flex mt-2 text-slate-400 text-sm"> ID : text</div>
        </div>
      </STUserWrap>
    </STSection>
  );
};

const STImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
`;

const STUserWrap = styled.div`
  border: 1px solid transparent;
  border-radius: 20px;
  height: auto;
  padding: 1rem;
  background-color: #ebf7ff;
  margin: 4rem 1rem 1rem 1rem;
  display: flex;
  gap: 3rem;
`;

export default UserInfo;
