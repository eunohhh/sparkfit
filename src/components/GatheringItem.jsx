import React from 'react';

const GatheringItem = () => {
  return (
    <div className="w-[1280px] mx-auto">
      <div className="flex gap-8 bg-white p-8 shadow-lg rounded-xl">
        <div>
          {/* 모임 이미지 */}
          <img src="http://via.placeholder.com/300x200" alt="모임이미지" />
        </div>
        <div className="w-full flex flex-col gap-5">
          {/* 모임 설명 */}
          <div className="flex justify-between items-center">
            {/* 모임 제목/해시태그/버튼 */}
            <div>
              <h2 className="text-xl mb-3 font-semibold">클라이밍하우스</h2>
              <ul className="flex gap-2.5">
                <li className="rounded-full bg-default px-5 py-1.5 line-height-none text-xs">운동/스포츠</li>
                <li className="py-1.5 line-height-none text-xs">의정부</li>
                <li className="py-1.5 line-height-none text-xs">멤버 50</li>
              </ul>
            </div>
            <div>
              <button className="transition-all duration-300 ease-in-out bg-[#82C0F9] rounded-lg px-8 py-3 text-xs text-white hover:bg-[#6FA3D4]">
                상세보기
              </button>
            </div>
          </div>

          <p className="text-sm w-[80%] overflow-hidden text-ellipsis line-clamp-2 ">
            자연에서 이루어지는 암벽등반에서 출발한 스포츠 클라이밍은 건물 벽이나 암벽을 연상케하는 벽에 달린 인공
            홀드를 이용해 높이 오르는 스포츠이다. 일상 생활에서 흔히 느끼지 못한 수직벽을 오르기 위해서는 전신 근력을
            쓰는 동시에 집중력을 지속적으로 발휘해야 하는 스포츠이다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GatheringItem;
