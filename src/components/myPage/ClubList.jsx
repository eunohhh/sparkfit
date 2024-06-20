import React from 'react';
import ClubInfo from './ClubInfo';
import { RiGroupLine } from 'react-icons/ri';
import { STSection } from './MyPage';
import supabase from '@/supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/zustand/auth.store';

const ClubList = () => {
  const { userData } = useUserStore();

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

  console.log(theGatherings);

  return (
    <STSection>
      <h3 className="flex gap-2 border-b-2 border-slate-300 mt-2 ml-4 mr-4 w-[600px]">
        <RiGroupLine />
        신청한 모임
      </h3>
      {/* 가져온 모임 정보 맵으로 뿌리기 */}
      {theGatherings && theGatherings.map(({ place_id }, index) => <ClubInfo key={index + 1} placeID={place_id} />)}
    </STSection>
  );
};

export default ClubList;
