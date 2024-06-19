import React from 'react';
import ClubInfo from './ClubInfo';
import { RiGroupLine } from 'react-icons/ri';
import { STSection } from './MyPage';

const ClubList = () => {
  return (
    <STSection>
      <h3 className="flex gap-2 border-b-2 border-slate-300 mt-2 ml-4 mr-4 w-[600px]">
        <RiGroupLine />
        신청한 모임
      </h3>
      {/* 가져온 모임 정보 맵으로 뿌리기_컴포넌트 분리*/}
      <ClubInfo />
    </STSection>
  );
};

export default ClubList;
