import React from 'react';
import ClubInfo from './ClubInfo';
import { STSection } from '../../pages/MyPage';

const ClubList = () => {
  return (
    <STSection>
      {/* 이모티콘 */}
      <h3 className="border-b-2 border-slate-300">신청한 모임</h3>
      {/* 가져온 모임 정보 맵으로 뿌리기_컴포넌트 분리*/}
      <ClubInfo />
    </STSection>
  );
};

export default ClubList;
