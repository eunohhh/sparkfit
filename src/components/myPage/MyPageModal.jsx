import React, { useRef } from 'react';
import useOutsideClick from '../useOutsideClick';

const MyPageModal = ({ close }) => {
  const myModalRef = useRef(null);

  const handleCloseModal = () => {
    close?.();
  };

  useOutsideClick(myModalRef, handleCloseModal);

  // const handleProfileImage = async (event) => {
  //   const file = event.target.files[0];
  //   console.log(file);
  // 이미지를 미리보기하는 방법 (선택 사항)
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //         const imgElement = document.getElementById('profile-image-preview');
  //         imgElement.src = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  // }
  // `image/user_${userId}.png`, file, { upsert: true };

  // 수파베이스 업로드
  // const { data, error } = await supabase.storage.from('profile').upload('file_path', file)
  // if (error) {
  //   // Handle error
  // } else {
  //   // Handle success
  // }
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="h-auto rounded-lg w-[700px] bg-white absolute" ref={myModalRef}>
        <div className="m-2 flex justify-center items-center">
          <h3>내 정보</h3>
        </div>
        {/* 사진 미리보기로 이미지 띄워주기? */}
        <div>이미지 태그 classname mw150px mh150px rounded</div>
        <form>
          <div className="my-3 mx-3">
            <div className="flex flex-col">
              <label htmlFor="name" className="ml-1">
                닉네임
              </label>
              <input className="px-5 py-2.5 rounded-md m-1.5 font-semibold border" type="text" autoFocus />
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
