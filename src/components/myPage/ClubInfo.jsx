import React, { useEffect } from 'react';
import ImagePlaceholder from '../../styles/image/ImagePlaceholder.png';
import { useUserStore } from '@/zustand/auth.store';
import { useQuery } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';

const ClubInfo = ({ placeID }) => {
  const { userData } = useUserStore();

  console.log(placeID);

  const MyClubLists = async () => {
    const { data, error } = await supabase
      .from('Places')
      .select('region, sports_name, gather_name, deadline, texts')
      .eq('id', placeID);

    return data;
  };

  const { data: theClubs } = useQuery({
    queryKey: ['myClubs', placeID],
    queryFn: MyClubLists,
    enabled: !!placeID
  });

  console.log(theClubs);

  return (
    <div className="pl-4 pb-4">
      {/* 가져온 모임 정보 맵으로 뿌리기*/}
      <div className="flex flex-row flex-1 justify-between p-4 mb-4 max-h-200px border-4 border-indigo-200 rounded w-[600px]">
        <img src={ImagePlaceholder} alt="이미지" className="max-w-[150px] max-h-[150px]" />
        <div className="flex flex-col mt-8 mr-40 mb-6 ml-6 md:text-balance sm: text-nowrap ">
          <div>
            모임명 : <span> {gather_name && gather_name} </span>
          </div>
          <div>
            스포츠명 : <span>{sparts_name && sparts_name}</span>
          </div>
          <div>{texts && texts}</div>
        </div>
        {/* 데드라인 기재하고 현재 날짜에 맞춰 변경! */}
        <div className="flex md:text-balance sm: text-nowrap">
          <span>{region && region}</span>
          <span>{deadline && deadline}</span>
        </div>
      </div>
    </div>
  );
};

export default ClubInfo;
