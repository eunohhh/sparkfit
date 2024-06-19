import React from 'react';
import ClubInfo from './ClubInfo';
import { RiGroupLine } from 'react-icons/ri';
import { STSection } from './MyPage';
import supabase from '@/supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';

const ClubList = () => {
  // const getG = async () => {
  //   const { data, error } = await supabase
  //     .from('Users')
  //     .select('email, profile_image, nickname')
  //     .eq('user_id', userData.user.id);

  //   if (error) {
  //     console.log(error);
  //   }
  //   return data;
  // };

  // const {
  //   data: theUser,
  //   isPending,
  //   error: usersError
  // } = useQuery({
  //   queryKey: ['Users'],
  //   queryFn: getUser
  // });

  // if (isPending) {
  //   return <div>loading...</div>;
  // }

  // if (usersError) {
  //   return <div>error!</div>;
  // }

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
