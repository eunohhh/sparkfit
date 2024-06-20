import React, { useEffect, useState } from 'react';
import Ellipse1 from '../../styles/image/Ellipse1.png';
import { RiUser3Line } from 'react-icons/ri';
import { STSection } from './MyPage';
import { HiPencilSquare } from 'react-icons/hi2';
import { useQuery } from '@tanstack/react-query';
import MyPageModal from './MyPageModal';
import { useUserStore } from '@/zustand/auth.store';
import supabase from '@/supabase/supabaseClient';

//auth.getUser 새로고침 문제

const UserInfo = () => {
  const [myPageModal, setMyPageModal] = useState(false);
  const { userData } = useUserStore();
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState(Ellipse1);

  //로그인 유저 정보.... 로컬 스토리지에서 엑세스 토큰을 사용해서 가져오는 매서드를 이용하기.....리렌더링이 되는 이유 : 상태 변환!auth.getUser
  // 새로고침

  const getUser = async () => {
    const { data, error } = await supabase
      .from('Users')
      .select('email, profile_image, nickname')
      .eq('user_id', userData.user.id);

    if (error) {
      console.log(error);
    } else {
      setNickname(data[0].nickname);
      setImage(data[0].profile_image);
    }
    return data;
  };

  const {
    data: theUser,
    isPending,
    error: usersError
  } = useQuery({
    queryKey: ['Users'],
    queryFn: getUser
  });

  if (isPending) {
    return <div>loading...</div>;
  }

  if (usersError) {
    return <div>error!</div>;
  }

  return (
    <STSection>
      <h3 className="flex gap-2 border-b-2 border-slate-300 mt-4 ml-4 mr-4 w-[600px]">
        <RiUser3Line />내 정보
      </h3>
      <div className="flex rounded-2xl p-4 mr-4 mb-4 ml-4 gap-12 bg-customBackground w-[600px] ">
        <div className="relative flex items-center">
          {/* TODO: 사진 미리 보기? */}
          <img
            src={image}
            alt="profile-img"
            className="relative rounded-full overflow-hidden max-w-[95px] max-h-[95px]"
          />
        </div>
        <div>
          {/* TODO: 로그인된 유저만 가져오게 바꾸기 */}
          <div className="flex mt-5">{nickname} 님 반갑습니다.</div>
          <div className="flex mt-2 text-slate-400 text-sm">email : {theUser && theUser[0].email}</div>
        </div>
        <div>
          <HiPencilSquare
            className="w-6 h-6"
            onClick={() => {
              setMyPageModal(true);
            }}
          />
          {myPageModal && (
            <MyPageModal
              close={() => {
                setMyPageModal(false);
              }}
              nickname={nickname}
              setNickname={setNickname}
              setImage={setImage}
            />
          )}
        </div>
      </div>
    </STSection>
  );
};

export default UserInfo;
