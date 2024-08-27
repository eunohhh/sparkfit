import supabase from '@/supabase/supabaseClient';
import { useUserStore } from '@/zustand/auth.store';
import { useQuery } from '@tanstack/react-query';
import { AiFillThunderbolt, AiOutlineThunderbolt } from 'react-icons/ai';
import { RiGroupLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ClubInfo, { STDeadline } from './ClubInfo';
import { STSection } from '@/pages/MyPage/MyPage';

const ClubList = () => {
  const userData = useUserStore((state) => state.userData);
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

  const deadlineDate =
    MyCreateGathering && MyCreateGathering[0] && MyCreateGathering[0].deadline
      ? new Date(MyCreateGathering[0].deadline)
      : null;
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
        <h3 className="flex gap-2 mt-2 text-xl items-center">
          <RiGroupLine />내 번개 모임
        </h3>
        <div className="min-[320px]:block min-[320px]:mb-[10%] sm:mb-0 lg:flex justify-between gap-5">
          {/* 내가 가입한 모임 */}
          <div className="flex flex-col gap-4 w-full">
            {theGatherings && theGatherings.length > 0 ? (
              <ul className="truncate">
                <span className="flex border-b-2 border-slate-300 mb-5 text-lg items-center">
                  <AiFillThunderbolt />
                  내가 가입한 번개
                </span>
                {theGatherings.map(({ place_id }, index) => (
                  <li key={index + 1} onClick={() => handleMoveToDetail(place_id)} className="cursor-pointer truncate">
                    <ClubInfo placeID={place_id} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <span className="flex border-b-2 border-slate-300 mb-5 text-lg items-center">
                  <AiFillThunderbolt />
                  내가 가입한 번개
                </span>
                <div className="flex mx-auto text-slate-400">
                  가입한 번개 <AiFillThunderbolt /> 모임이 없어요!
                </div>
              </div>
            )}
          </div>
          {/* 내가 만든 모임 */}
          <div className="flex flex-col gap-4 w-full">
            {MyCreateGathering && MyCreateGathering.length > 0 ? (
              <ul>
                <span className="flex border-b-2 border-slate-300 mb-5 text-lg items-center">
                  <AiOutlineThunderbolt />
                  내가 만든 번개
                </span>
                {MyCreateGathering.map(({ region, sports_name, gather_name, deadline, id }, index) => (
                  <li
                    key={index + 1}
                    onClick={() => handleMoveToDetail(id)}
                    className="cursor-pointer p-4 min-h-35 border-2 border-indigo-300 rounded-lg mb-5 hover:shadow-xl transition-all duration-300 ease-in-out"
                  >
                    <div className="flex justify-between">
                      <div className="bg-[#efefef] rounded-md px-3 py-2 mb-2 text-center w-[120px]">{sports_name}</div>
                      <STDeadline $status={$status}>{deadline}</STDeadline>
                    </div>
                    <div className="flex flex-col">
                      <div className="pb-2 text-xl mt-4 font-black truncate">{gather_name}</div>
                      <div>{region}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col gap-4">
                <span className="flex border-b-2 border-slate-300 mb-5 text-lg items-center">
                  <AiOutlineThunderbolt />
                  내가 만든 번개
                </span>
                <div className="flex mx-auto text-slate-400">
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
