import { useState } from 'react';
import JoinModal from '../components/JoinModal';

const DetailedPost = () => {
  const [joinModal, setJoinModal] = useState(false);
  return (
    <>
      <div className="w-[1280px] mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="text-5xl font-bold ">클라이밍 하우스</div>
          <button
            onClick={() => {
              setJoinModal(true);
            }}
            className="bg-btn-blue border border-none rounded-md text-white font-bold w-[200px] h-[60px] text-2xl"
          >
            가입하기
          </button>
          {joinModal && (
            <JoinModal
              open={joinModal}
              close={() => {
                setJoinModal(false);
              }}
            />
          )}
        </div>

        <div className="flex gap-3 items-center my-4  ">
          <span className="bg-gray-200 rounded-md px-3 py-1">의정부</span>
          <span className="bg-gray-200 rounded-md px-3 py-1 ">클라이밍</span>
          <span className="bg-gray-200 rounded-md px-3 py-1">멤버 50</span>
        </div>

        <div className=" rounded-full border-none flex flex-row items-center">
          <img src="/snowman_yukidaruma_tokeru.png" alt="기본" className="w-[80px] h-[80px]" />
          <div className="flex flex-row mx-2 items-center">
            <div className="text-2xl">닉네임</div>
            <div className="text-1xl ml-2">모임장</div>
          </div>
        </div>

        <div className="text-start my-4 bg-gray-100 rounded-md px-5 py-5">모임명 :</div>
        <div className="text-start my-4 bg-gray-100 rounded-md px-5 py-5">모임설명 :</div>
        <div className="text-start my-4 bg-gray-100 rounded-md px-5 py-5">스포츠명 :</div>
        <div className="text-start my-4 bg-gray-100 rounded-md px-5 py-5">총인원 :</div>
      </div>
    </>
  );
};

export default DetailedPost;
