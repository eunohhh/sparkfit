import React from 'react';
import { STSection } from '../MyPage';
import ClubInfo from './ClubInfo';
import { LiaUserFriendsSolid } from 'react-icons/lia';

const ClubList = () => {
  return (
    <STSection>
      {/* 이모티콘 */}
      <h3 className="flex gap-2 border-b-2 border-slate-300 mt-2 ml-4 mr-4">
        <LiaUserFriendsSolid />
        신청한 모임
      </h3>
      {/* 가져온 모임 정보 맵으로 뿌리기_컴포넌트 분리*/}
      <ClubInfo />
    </STSection>
  );
};

export default ClubList;
