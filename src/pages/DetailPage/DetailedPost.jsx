import { useState } from 'react';
import JoinModal from '../../components/DetailPage/JoinModal';
import CreateGroupModal from '../../components/DetailPage/CreateGroupModal';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/api/postsListApi';
import { useParams } from 'react-router-dom';
// import { profileApi } from '@/api/profileApi';

const DetailedPost = () => {
  const { id } = useParams();
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [openCreateGroupModal, setCreateGroupModal] = useState(false);

  const { data: posts, isLoading, isError } = useQuery({ queryKey: ['posts', id], queryFn: () => getPost(id) });
  // const { data: profiles, loading, error } = useQuery({ queryKey: ['profiles', id], queryFn: () => profileApi(id) });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>오류 발생</div>;
  }

  return (
    <>
      <div className="w-[1280px] mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="text-5xl font-bold my-11 ">{posts.gather_name}</div>
          <button
            onClick={() => {
              setOpenJoinModal(true);
            }}
            className="bg-btn-blue border border-none rounded-md text-white font-bold w-[200px] h-[60px] text-2xl"
          >
            가입하기
          </button>
          {openJoinModal && (
            <JoinModal
              close={() => {
                setOpenJoinModal(false);
              }}
            />
          )}
        </div>

        <div className="flex gap-3 items-center my-4  ">
          <span className="bg-gray-200 rounded-md px-3 py-1 ">{posts.region}</span>
          <span className="bg-gray-200 rounded-md px-3 py-1 ">{posts.sports_name}</span>
          <span className="bg-gray-200 rounded-md px-3 py-1">{posts.deadline}</span>
        </div>

        <div className=" rounded-full border-none flex flex-row items-center">
          <img src="/default-user-profile.png" alt="기본" className="w-[80px] h-[80px]" />
          <div className="flex flex-row mx-2 items-center">
            {/* <div className="text-2xl">{profiles.nickname}</div> */}
            <div className="text-1xl ml-2">모임장</div>
          </div>
        </div>

        <div className="text-start my-4 bg-gray-200 rounded-md px-5 py-5">{`모임명 : ${posts.gather_name}`}</div>
        <div className="text-start my-4 bg-gray-200 rounded-md px-5 py-5">{`모임설명 : ${posts.texts}`}</div>
        <div className="text-start my-4 bg-gray-200 rounded-md px-5 py-5">{`스포츠명 : ${posts.sports_name}`}</div>
        <div className="text-start my-4 bg-gray-200 rounded-md px-5 py-5">{`마감기한 : ${posts.deadline}`}</div>
      </div>
      <button className="text-5xl flex justify-center" onClick={() => setCreateGroupModal(true)}>
        test
      </button>
      {openCreateGroupModal && (
        <CreateGroupModal
          close={() => {
            setCreateGroupModal(false);
          }}
        />
      )}
    </>
  );
};

export default DetailedPost;