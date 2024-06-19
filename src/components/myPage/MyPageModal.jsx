import React, { useRef, useState } from 'react';
import Ellipse1 from '../../styles/image/Ellipse1.png';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/zustand/auth.store';
import supabase from '@/supabase/supabaseClient';
import useOutsideClick from '../DetailPage/useOutsideClick';

const MyPageModal = ({ close, nickname }) => {
  const [profileImage, setProfileImage] = useState(Ellipse1);
  const { userData } = useUserStore();
  const myModalRef = useRef(null);

  const handleCloseModal = () => {
    close?.();
  };

  useOutsideClick(myModalRef, handleCloseModal);

  const userID = userData.user.id;
  console.log(userID);

  //TODO: 이미지 바꾸기
  const handleProfileImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const fileName = `image_${userID}_${Date.now()}`;

    // 이미지를 미리보기는 다 끝나고 시간 남으면... 추가...

    // 수파베이스 파일 업로드
    if (file) {
      const { data: profileImage, error } = await supabase.storage.from('imageFile').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

      if (error) {
        console.log(error);
      }

      //url -> user table
      const { publicUrl } = await supabase.storage.from('imageFile').getPublicUrl(fileName);

      // 사용자 테이블에 이미지 URL 업데이트.... 인데 로직 점검....!!
      const { data: updateData, error: updateError } = await supabase
        .from('Users')
        .update({
          profile_image: publicUrl
        })
        .eq('user_id', userID);

      if (updateError) {
        console.error('사용자 정보 업데이트 중 오류 발생:', updateError.message);
        return;
      }

      setProfileImage(publicUrl);
      console.log('프로필 이미지 업데이트 완료:', updateData);

      handleCloseModal();
    }
  };

  // TODO: 모달 가운데로 띄우기

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="h-auto rounded-lg w-[500px] bg-white" ref={myModalRef}>
        <div className="m-2 flex justify-center items-center">
          <h3>내 정보</h3>
        </div>
        {/* 사진 미리보기로 이미지 띄워주기? 시간 남으면~~!
        <img src={profileImage} className="mw-[150px] mh-[150px] rounded flex justify-center" /> */}
        <div>
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
              <input
                className="px-5 py-2.5 rounded-md m-1.5 font-semibold border"
                type="file"
                onChange={handleProfileImage}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
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
        </div>
      </div>
    </div>
  );
};

export default MyPageModal;
