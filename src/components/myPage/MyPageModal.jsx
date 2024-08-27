import supabase from '@/supabase/supabaseClient';
import { useUserStore } from '@/zustand/auth.store';
import { useRef, useState } from 'react';
import useOutsideClick from '../DetailPage/useOutsideClick';

const MyPageModal = ({ close, nickname, setNickname, setImage }) => {
  const [newNickname, setNewNickname] = useState(nickname);
  const [file, setFile] = useState(null);
  const userData = useUserStore((state) => state.userData);
  const myModalRef = useRef(null);

  const handleCloseModal = () => {
    close?.();
  };

  useOutsideClick(myModalRef, handleCloseModal);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const userID = userData.user.id;
  const handleProfile = async () => {
    try {
      if (file) {
        const fileName = `image_${userID}_${Date.now()}`;

        const { data: profileImage, error } = await supabase.storage.from('imageFile').upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

        const { data: publicUrlData } = await supabase.storage.from('imageFile').getPublicUrl(fileName);
        const publicUrl = publicUrlData.publicUrl;

        const { data: updateData, error: updateError } = await supabase
          .from('Users')
          .update({
            profile_image: publicUrl
          })
          .eq('user_id', userID);

        if (updateError) {
          console.log('updateError : ', updateError);
        } else {
          setImage(publicUrl);
        }
      }

      const { data: userNameData, error: userNameError } = await supabase
        .from('userinfo')
        .update({
          username: newNickname
        })
        .eq('id', userID);

      if (userNameError) {
        console.log('username error : ', userNameError);
      } else {
        setNickname(newNickname);
      }
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="h-auto rounded-lg w-[500px] bg-white" ref={myModalRef}>
        <div className="m-2 flex justify-center items-center">
          <h3>내 정보</h3>
        </div>
        <div className="my-3 mx-3">
          <div className="flex flex-col">
            <label htmlFor="newNickname" className="ml-1">
              닉네임
            </label>
            <input
              className="px-5 py-2.5 rounded-md m-1.5 font-semibold border"
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              id="newNickname"
            />
            <label htmlFor="profile" className="ml-1">
              프로필 사진
            </label>
            <input
              className="px-5 py-2.5 rounded-md m-1.5 font-semibold border"
              type="file"
              id="profile"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleProfile}
              className="text-base px-5 py-2.5 border-none bg-btn-blue rounded-md text-white m-1.5 font-semibold cursor-pointer"
            >
              변경하기
            </button>
            <button
              className="text-base px-5 py-2.5 border-none bg-btn-blue rounded-md text-white m-1.5 font-semibold cursor-pointer"
              type="button"
              onClick={close}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageModal;
