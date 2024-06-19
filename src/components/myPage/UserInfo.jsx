import React, { useEffect, useState } from 'react';
import Ellipse1 from '../../styles/image/Ellipse1.png';
import { RiUser3Line } from 'react-icons/ri';
import { STSection } from './MyPage';
import { HiPencilSquare } from 'react-icons/hi2';
import supabase from '@/supabase';
import { useQuery } from '@tanstack/react-query';
import MyPageModal from './MyPageModal';

const UserInfo = () => {
  const [image, setImage] = useState(Ellipse1);
  const [myPageModal, setMyPageModal] = useState(false);

  //TODO: users 값 전부 가져오는데 특정 값만 가져오는 것으로 바꾸기
  const getUser = async () => {
    const { data, error } = await supabase.from('Users').select('*');
    if (error) {
      console.log(error);
    }
    return data;
  };

  const {
    data: users,
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

  // console.log(users);

  return (
    <STSection>
      <h3 className="flex gap-2 border-b-2 border-slate-300 mt-4 ml-4 mr-4 w-[600px]">
        <RiUser3Line />내 정보
      </h3>
      <div className="flex rounded-2xl p-4 mr-4 mb-4 ml-4 gap-12 bg-customBackground w-[600px] ">
        <div className="relative flex items-center">
          {/* TODO: 임시값 */}
          <img
            src={users[0] && users[0].profile_image === null ? Ellipse1 : users[0].profile_image}
            alt="profile-img"
            className="relative rounded-full overflow-hidden max-w-[95px] max-h-[95px]"
          />
        </div>
        <div>
          {/* TODO: 로그인된 유저만 가져오게 바꾸기 임시값 */}
          <div className="flex mt-5">{users && users[0].nickname} 님 반갑습니다.</div>
          <div className="flex mt-2 text-slate-400 text-sm"> email : {users && users[0].email}</div>
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
            />
          )}
        </div>
      </div>
    </STSection>
  );
};

export default UserInfo;
