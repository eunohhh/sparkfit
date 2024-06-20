import React, { useEffect } from 'react';
import ImagePlaceholder from '../../../public/ImagePlaceholder.png';
import { useQuery } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import styled from 'styled-components';

const ClubInfo = ({ placeID }) => {
  const MyClubLists = async () => {
    const { data: mylist, error } = await supabase
      .from('Places')
      .select('region, sports_name, gather_name, deadline, texts')
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

    if (today < deadlineDate) {
      return 'dayFuture';
    } else if (today === deadlineDate) {
      return 'dayToday';
    } else {
      return 'dayPast';
    }
  };

  const deadlineDate = new Date(theClubs[0].deadline);
  const $status = getDeadlineStatus(deadlineDate);

  return (
    <>
      {/* 가져온 모임 정보 맵으로 뿌리기*/}
      <div className="flex flex-row flex-1 justify-between p-4 max-h-200px border-4 border-indigo-200 rounded w-[600px] ml-4 hover:shadow-xl hover:translate-y-1 hover:ease-in-out">
        <img src={ImagePlaceholder} alt="이미지" className="max-w-[150px] max-h-[150px]" />
        <div className="flex flex-col mt-8 mr-20 mb-6 ml-6 md:text-balance sm: text-nowrap ">
          <div>
            모임명 : <span> {theClubs[0].gather_name} </span>
          </div>
          <div>
            스포츠명 : <span>{theClubs[0].sports_name}</span>
          </div>
          <div>{theClubs[0].texts}</div>
        </div>
        <div className="flex md:text-balance sm: text-nowrap flex-col text-center">
          <div>{theClubs[0].region}</div>
          <STDeadline $status={$status}>{theClubs[0].deadline}</STDeadline>
        </div>
      </div>
    </>
  );
};

const STDeadline = styled.div`
  height: min-content;
  padding: 0.125rem;
  border-radius: 10px;
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
