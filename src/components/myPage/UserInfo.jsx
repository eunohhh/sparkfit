import React, { useState } from 'react';
import styled from 'styled-components';
import Ellipse1 from '../../styles/image/Ellipse1.png';
import { FaUser } from 'react-icons/fa';
import { STSection } from './MyPage';
import { HiPencilSquare } from 'react-icons/hi2';

const UserInfo = () => {
  const [image, setImage] = useState(Ellipse1);

  return (
    <STSection>
      <h3 className="flex gap-2 border-b-2 border-slate-300 mt-4 ml-4 mr-4">
        <FaUser />내 정보
      </h3>
      <STUserWrap className="flex rounded-2xl p-4 mr-4 mb-4 ml-4 gap-12">
        <div className="relative flex items-center">
          <img
            src={image}
            alt="profile-img"
            className="relative rounded-full overflow-hidden max-w-[95px] max-h-[95px]"
          />
          <label htmlFor="profile_image" className="absolute bottom-1 right-2">
            <HiPencilSquare />
          </label>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            id="profile_image"
            // value={image}
            // onChange={(event) => setImage(event.target.value)}
          />
        </div>
        <div>
          <div className="flex mt-5">닉네임 님 반갑습니다.</div>
          <div className="flex mt-2 text-slate-400 text-sm"> ID : text</div>
        </div>
      </STUserWrap>
    </STSection>
  );
};

//색상 팔레트가 별로 없어서 이렇게 해두었습니다T.T
const STUserWrap = styled.div`
  background-color: #ebf7ff;
`;

export default UserInfo;
