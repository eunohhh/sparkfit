import supabase from '@/supabase/supabaseClient';
import { useUserStore } from '@/zustand/auth.store';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { HiPencilSquare } from 'react-icons/hi2';
import { RiUser3Line } from 'react-icons/ri';
import Loading from '../GatheringPage/Loading';
import { STSection } from '@/pages/MyPage/MyPage';
import MyPageModal from './MyPageModal';

const UserInfo = () => {
  const [myPageModal, setMyPageModal] = useState(false);
  const userData = useUserStore((state) => state.userData);
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState('/Ellipse1.png');

  const getUserInfo = async () => {
    const { data, error } = await supabase
      .from('userinfo')
      .select('email, profile_image, username')
      .eq('id', userData.user.id);

    if (error) {
      console.log(error);
    } else {
      setNickname(data[0].nickname);
      setImage(data[0].profile_image || '/Ellipse1.png');
    }
    return data;
  };

  const {
    data: theUser,
    isPending,
    error: usersError
  } = useQuery({
    queryKey: ['Users'],
    queryFn: getUserInfo
  });

  if (isPending) {
    return <Loading />;
  }

  if (usersError) {
    console.log(usersError);
    return <div>error!</div>;
  }

  return (
    <STSection>
      <h3 className="flex gap-2 border-b-2 border-slate-300 text-lg items-center">
        <RiUser3Line />내 정보
      </h3>
      <div className="flex rounded-2xl p-4  gap-12 bg-customBackground justify-between items-center">
        <div className="relative flex items-center">
          <img src={image} alt="profile-img" className="relative rounded-full overflow-hidden w-[70px] h-[70px]" />
        </div>
        <div className="flex-auto">
          <div>{nickname} 님 반갑습니다.</div>
          <div className="text-slate-400 text-sm mt-2">email : {theUser && theUser[0].email}</div>
        </div>
        <div className="cursor-pointer">
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
