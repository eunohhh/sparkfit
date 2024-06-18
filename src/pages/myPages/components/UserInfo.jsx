import React from 'react';
import { STSection } from '../MyPage';
import styled from 'styled-components';
import Ellipse1 from '../../../styles/image/Ellipse1.png';
import { FaUser } from 'react-icons/fa';
import ProfileButton from '../../../styles/image/ProfileButton.png';

const UserInfo = () => {
  return (
    <STSection>
      <h3 className="flex gap-2 border-b-2 border-slate-300 mt-4 ml-4 mr-4">
        <FaUser />내 정보
      </h3>
      <STUserWrap>
        <div className="relative flex items-center">
          <STImage src={Ellipse1} alt="profile-img" className="relative" />
          <label htmlFor="progileImageBtn" className="absolute bottom-1 right-2">
            <img src={ProfileButton} alt="progile-change-btn" className="w-5" />
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
  margin: 0 1rem 1rem 1rem;
  display: flex;
  gap: 3rem;
`;

export default UserInfo;
