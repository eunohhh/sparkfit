import React from 'react';
import ClubInfo, { STDeadline } from './ClubInfo';
import { RiGroupLine } from 'react-icons/ri';
import { STSection } from './MyPage';
import supabase from '@/supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { useSignInStore } from '@/zustand/auth.store';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { AiFillThunderbolt } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ClubList = () => {
  const { userData } = useSignInStore();
  const navigate = useNavigate();

  const getMyGathering = async () => {
    const { data, error } = await supabase.from('Contracts').select('place_id').eq('user_id', userData.user.id);
    if (error) {
      console.log(error);
    }
    return data;
  };

  const { data: theGatherings } = useQuery({
    queryKey: ['myGathering'],
    queryFn: getMyGathering
  });

  const getMyCreateGathering = async () => {
    const { data: CreateGathering, error: CreateGatheringError } = await supabase
      .from('Places')
      .select('region, sports_name, gather_name, deadline, id')
      .eq('created_by', userData.user.id);

    if (CreateGatheringError) {
      console.log(CreateGatheringError);
    }

    return CreateGathering;
  };

  const { data: MyCreateGathering } = useQuery({
    queryKey: ['myCreateGathering'],
    queryFn: getMyCreateGathering
  });

  const getDeadlineStatus = (deadlineDate) => {
    const today = new Date();

    if (!MyCreateGathering || MyCreateGathering.length === 0) {
      return;
    }

    if (today < deadlineDate) {
      return 'dayFuture';
    } else if (today === deadlineDate) {
      return 'dayToday';
    } else {
      return 'dayPast';
    }
  };

  const deadlineDate = MyCreateGathering ? new Date(MyCreateGathering[0].deadline) : null;
  const $status = getDeadlineStatus(deadlineDate);

  const handleMoveToDetail = (place_id) => {
    Swal.fire({
      title: '모임 상세 페이지로 이동하시겠어요?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: '이동하기',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/detail/${place_id}`);
      }
    });
  };

  return (
    <>
      <STSection>
        <h3 className="flex gap-2 border-b-2 border-slate-300 mt-2 ml-4 mr-4 w-[600px]">
          <RiGroupLine />내 번개 모임
        </h3>
        <div className="flex">
          {/* 내가 가입한 모임 */}
          <div className="flex flex-col gap-4">
            {theGatherings && theGatherings.length > 0 ? (
              <ul>
                <span className="flex border-b-2 border-slate-300 w-[290px] mb-4 ml-4">
                  <AiFillThunderbolt />
                  내가 가입한 번개
                </span>
                {theGatherings.map(({ place_id }, index) => (
                  <li key={index + 1} onClick={() => handleMoveToDetail(place_id)} className="cursor-pointer">
                    <ClubInfo placeID={place_id} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col gap-4">
                <span className="flex border-b-2 border-slate-300 w-[290px] mb-4 ml-4">
                  <AiFillThunderbolt />
                  내가 가입한 번개
                </span>
                <div className="flex mx-auto">
                  가입한 번개 <AiFillThunderbolt /> 모임이 없어요!
                </div>
              </div>
            )}
          </div>
          {/* 내가 만든 모임 */}
          <div className="flex flex-col gap-4">
            {MyCreateGathering && MyCreateGathering.length > 0 ? (
              <ul>
                <span className="flex border-b-2 border-slate-300 w-[290px] mb-4 ml-4">
                  <AiOutlineThunderbolt />
                  내가 만든 번개
                </span>
                {MyCreateGathering.map(({ region, sports_name, gather_name, deadline, id }, index) => (
                  <li key={index + 1} onClick={() => handleMoveToDetail(id)} className="cursor-pointer">
                    <div className="flex flex-row flex-1 justify-between p-4 min-h-44 border-4 border-indigo-400 rounded-lg w-[285px] ml-4 mb-2 relative hover:shadow-xl hover:translate-y-1 hover:ease-in-out">
                      <div className="flex flex-col md:text-balance sm:text-nowrap">
                        <div className="bg-gray-200 rounded-md px-3 mb-2 w-[75px] h-[25px] text-center">
                          {sports_name}
                        </div>
                        <div className="absolute bottom-0 pb-7 text-xl font-black truncate">{gather_name}</div>
                      </div>
                      <div className="flex md:text-balance sm:text-nowrap flex-col text-center items-end">
                        <STDeadline $status={$status}>{deadline}</STDeadline>
                        <div className="bg-gray-200 rounded-md px-3 py-1 mt-2">{region}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col gap-4">
                <span className="flex border-b-2 border-slate-300 w-[290px] mb-4 ml-4">
                  <AiOutlineThunderbolt />
                  내가 만든 번개
                </span>
                <div className="flex mx-auto">
                  만든 번개 <AiOutlineThunderbolt /> 모임이 없어요!
                </div>
              </div>
            )}
          </div>
        </div>
      </STSection>
    </>
  );
};

export default ClubList;
