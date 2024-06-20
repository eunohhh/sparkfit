import React from 'react';
import { useQuery } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import styled from 'styled-components';

const ClubInfo = ({ placeID }) => {
  const MyClubLists = async () => {
    const { data: mylist, error } = await supabase
      .from('Places')
      .select('region, sports_name, gather_name, deadline')
      .eq('id', placeID);

    if (error) {
      console.log('클났다 안 된다');
    }

    return mylist;
  };

  const {
    data: theClubs,
    isPending,
    error
  } = useQuery({
    queryKey: ['myClubs', placeID],
    queryFn: MyClubLists,
    enabled: !!placeID
  });

  if (error) {
    console.log('뭔가 잘못 됨');
  }

  if (isPending) {
    //스켈레톤 넣어야 겠다.
    return <div>loading..</div>;
  }

  const getDeadlineStatus = (deadlineDate) => {
    const today = new Date();

    if (!theClubs || theClubs.length === 0) {
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

  const deadlineDate = theClubs ? new Date(theClubs[0].deadline) : null;
  const $status = getDeadlineStatus(deadlineDate);

  return (
    <>
      {/* 가져온 모임 정보 맵으로 뿌리기*/}
      <div className="flex flex-row flex-1 justify-between p-4 min-h-44 border-4 border-indigo-200 rounded-lg w-[285px] ml-4 mb-2 relative hover:shadow-xl hover:translate-y-1 hover:ease-in-out">
        {/* <img src={ImagePlaceholder} alt="이미지" className="max-w-[150px] max-h-[150px]" /> */}
        <div className="flex flex-col md:text-balance sm: text-nowrap ">
          <div className="bg-gray-200 rounded-md px-3 mb-2 w-[75px] h-[25px] text-center">
            {theClubs[0].sports_name}
          </div>
          <div className="absolute bottom-0 pb-8 text-xl font-black">{theClubs[0].gather_name}</div>
        </div>
        <div className="flex md:text-balance sm: text-nowrap flex-col text-center">
          <STDeadline $status={$status}>{theClubs[0].deadline}</STDeadline>
          <div className="bg-gray-200 rounded-md px-3 py-1 mt-2">{theClubs[0].region}</div>
        </div>
      </div>
    </>
  );
};

export const STDeadline = styled.div`
  width: 90px;
  height: min-content;
  padding: 0.2rem;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  text-align: center;
  background-color: ${({ $status }) => {
    switch ($status) {
      case 'dayFuture':
        return '#a4f0a9';
      case 'dayToday':
        return '#b1c3f2F';
      case 'dayPast':
        return '#f7a9a9f';
      default:
        return 'gray';
    }
  }};
`;

export default ClubInfo;
