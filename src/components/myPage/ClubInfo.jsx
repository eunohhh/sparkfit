import React from 'react';

import ImagePlaceholder from '../../styles/image/ImagePlaceholder.png';
import { STSection } from './MyPage';

const ClubInfo = () => {
  return (
    <STSection>
      {/* 가져온 모임 정보 맵으로 뿌리기*/}
      <div className="flex-row flex-1 justify-between p-4 max-h-200px border-4 border-indigo-200 rounded">
        <img src={ImagePlaceholder} alt="이미지" className="max-w-[150px] max-h-[150px]" />
        <div className="flex flex-col mt-8 mr-40 mb-6 ml-6 md:text-balance sm: text-nowrap">
          <div>
            모임명 : <span>라켓 나가신다</span>
          </div>
          <div>
            스포츠명 : <span>테니스</span>
          </div>
          <div>
            인원수 : <span>n명 / n명</span>
          </div>
        </div>
        {/* 상태에 따라 다르게 표기 */}
        <div className="flex md:text-balance sm: text-nowrap">
          <span>승인 대기</span>
        </div>
      </div>
      {/* 예제로 하나 더 똑같이 뿌린 거 차후에 지우기*/}
      <div className="flex-row flex-1 justify-between p-4 max-h-200px border-4 border-indigo-200 rounded">
        <img src={ImagePlaceholder} alt="이미지" className="max-w-[150px] max-h-[150px]" />
        <div className="flex flex-col mt-8 mr-40 mb-6 ml-6 md:text-balance sm: text-nowrap">
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
        <div className="flex md:text-balance sm: text-nowrap">
          <span>승인 대기</span>
        </div>
      </div>
    </STSection>
  );
};

export default ClubInfo;