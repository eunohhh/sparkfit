import React, { useState } from 'react';
import Ellipse1 from '../../styles/image/Ellipse1.png';
import { RiUser3Line } from 'react-icons/ri';
import { STSection } from './MyPage';
import { HiPencilSquare } from 'react-icons/hi2';
import supabase from '@/supabase';
import { useQuery } from '@tanstack/react-query';

const UserInfo = () => {
  const [image, setImage] = useState(Ellipse1);

  //세션 트루인 사람으로 가져오기 (임시)
  const getUser = async () => {
    const { data } = await supabase.from('Users').select('*').eq('session', true);

    if (error) {
      console.log(error);
    }
    return data[0];
  };

  // 유저도 쥬스탠드로 관리하기 차후 수정
  const { data, isPending, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUser
  });

  if (isPending) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error!</div>;
  }

  return (
    <STSection>
      <h3 className="flex gap-2 border-b-2 border-slate-300 mt-4 ml-4 mr-4 w-[600px]">
        <RiUser3Line />내 정보
      </h3>
      <div className="flex rounded-2xl p-4 mr-4 mb-4 ml-4 gap-12 bg-customBackground w-[600px] ">
        <div className="relative flex items-center">
          <img
            src={image}
            alt="profile-img"
            className="relative rounded-full overflow-hidden max-w-[95px] max-h-[95px]"
          />
          <label htmlFor="profile_image" className="absolute bottom-1 right-2">
            <HiPencilSquare className="w-6 h-6" />
          </label>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            id="profile_image"
            // value={image}
            // onChange={(event) => setImage(event.target.value)}
          />
        </div>
        <div>
          <div className="flex mt-5">{data && data.username} 님 반갑습니다.</div>
          <div className="flex mt-2 text-slate-400 text-sm"> ID : {data && data.id}</div>
        </div>
      </div>
    </STSection>
  );
};

export default UserInfo;
