import React from 'react';
import { STSection } from '../../pages/MyPage';
import styled from 'styled-components';
import Ellipse2 from '../../styles/image/Ellipse2.png';

const ClubInfo = () => {
  return (
    <STSection>
      {/* 가져온 모임 정보 맵으로 뿌리기_컴포넌트 분리*/}
      <STClubFormat>
        <STClubImage src={Ellipse2} alt="이미지" />
        <div className="flex flex-col mt-8 mr-40 mb-6 ">
          <div>
            모임명 : <span>라켓 나가신다</span>
          </div>
          <div>
            스포츠명 : <span>테니스</span>
          </div>
          <div>
            인원수 : <span>n명</span>
          </div>
        </div>
        {/* 상태에 따라 다르게 표기 */}
        <div className="flex ">
          <span>승인 대기</span>
        </div>
      </STClubFormat>
      <STClubFormat>
        <STClubImage src={Ellipse2} alt="이미지" />
        <div className="flex flex-col mt-8 mr-40 mb-6 ">
          <div>
            모임명 : <span>라켓 나가신다</span>
          </div>
          <div>
            스포츠명 : <span>테니스</span>
          </div>
          <div>
            인원수 : <span>n명</span>
          </div>
        </div>
        {/* 상태에 따라 다르게 표기 */}
        <div className="flex ">
          <span>승인 대기</span>
        </div>
      </STClubFormat>
    </STSection>
  );
};

const STClubImage = styled.img`
  max-width: 150px;
  min-width: 150px;
`;

const STClubFormat = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  justify-content: space-between;
  padding: 1rem;
`;

export default ClubInfo;
