import React, { useRef, useState } from 'react';
import useOutsideClick from '../useOutsideClick';
import Ellipse1 from '../../styles/image/Ellipse1.png';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/zustand/auth.store';

const MyPageModal = ({ close, nickname }) => {
  const [profileImage, setProfileImage] = useState(Ellipse1);
  const { userData } = useUserStore();
  const myModalRef = useRef(null);

  const handleCloseModal = () => {
    close?.();
  };

  useOutsideClick(myModalRef, handleCloseModal);

  //TODO: 로그인한 유저의 값

  const handleProfile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    // 이미지를 미리보기는 다 끝나고 시간 남으면... 추가...

    if (file) {
      // 수파베이스 파일 업로드
      const { data: profileImage, error } = await supabase.storage
        .from('profile')
        .upload(`image/${Date.now()}.png`, file);

      if (error) {
        console.log(error);
      }

      //업로드한 거 가져오기
      const { publicUrl } = supabase.storage.from('avatars').getPublicUrl(data.path).data;
      setUserPic(`${publicUrl}?t=${new Date().getTime()}`);
    }
  };

  // const { data } = useQueries({});

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="h-auto rounded-lg w-[500px] bg-white absolute" ref={myModalRef}>
        <div className="m-2 flex justify-center items-center">
          <h3>내 정보</h3>
        </div>
        {/* 사진 미리보기로 이미지 띄워주기? 시간 남으면~~!
        <img src={profileImage} className="mw-[150px] mh-[150px] rounded flex justify-center" /> */}
        <form onSubmit={handleProfile}>
          <div className="my-3 mx-3">
            <div className="flex flex-col">
              <label htmlFor="name" className="ml-1">
                닉네임
              </label>
              {/* TODO: 디폴트밸류에 해당 유저 원래 닉네임 넣어주기 */}
              <input
                className="px-5 py-2.5 rounded-md m-1.5 font-semibold border"
                type="text"
                defaultValue={nickname}
              />
              <label htmlFor="profile" className="ml-1">
                프로필 사진
              </label>
              <input className="px-5 py-2.5 rounded-md m-1.5 font-semibold border" type="file" />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className=" text-base px-5 py-2.5 border-none bg-btn-blue rounded-md text-white m-1.5 font-semibold cursor-pointer "
              >
                변경하기
              </button>
              <button
                className=" text-base px-5 py-2.5 border-none bg-btn-blue rounded-md text-white m-1.5 font-semibold cursor-pointer "
                type="button"
                onClick={close}
              >
                닫기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyPageModal;
