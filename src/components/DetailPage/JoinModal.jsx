import { getPost } from '@/api/postsListApi';
import { checkIfUserHasJoined, loginUser } from '@/api/profileApi';
import supabase from '@/supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlertModal from './AlertModal';
import useOutsideClick from './useOutsideClick';

const JoinModal = ({ close }) => {
  const { id } = useParams();
  const modalRef = useRef(null);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const { data: posts } = useQuery({ queryKey: ['posts', id], queryFn: () => getPost(id) });
  const { data: user } = useQuery({ queryKey: ['user'], queryFn: loginUser });
  const { data: hasJoined } = useQuery({
    queryKey: ['checkUser', id, user?.id],
    queryFn: () => checkIfUserHasJoined(id, user?.id),
    enabled: !!user && !!id
  });

  const handleClose = () => {
    close?.();
  };

  useOutsideClick(modalRef, handleClose);

  console.log(posts.created_by);
  console.log(user);

  const joinGroup = async () => {
    if (posts.created_by === user.id) {
      alert('본인이 만든 모임에 참가 신청 할 수 없습니다');
      close();
      return;
    }

    if (hasJoined) {
      alert('두 번 신청할 수 없습니다');
      close();
      return;
    }

    const { data, error } = await supabase
      .from('Contracts')
      .insert([{ gather_name: posts.gather_name, place_id: posts.id, user_id: user.id }])
      .select();

    if (error) {
      console.error(error.message);
    } else {
      console.log(data);
    }
    setOpenAlertModal(false);
    close();
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-10 z-50">
      <div
        className="h-auto rounded-lg w-[700px] bg-white absolute top-[20%] left-1/2 transform -translate-x-1/2 - translate-y-1/2"
        ref={modalRef}
      >
        <div className="py-10">
          <div className="m-2 flex justify-center items-center flex-col">
            <h3 className="flex text-2xl mb-2">모임 가입</h3>
            <h1 className="flex">버튼 클릭시 즉시 신청됩니다</h1>
          </div>

          <div className="flex justify-center items-center my-3">
            <button
              className=" text-base px-5 py-2.5 border-none bg-btn-blue rounded-md text-white m-1.5 font-semibold cursor-pointer "
              type="button"
              onClick={joinGroup}
            >
              신청
            </button>

            <button
              className=" text-base px-5 py-2.5 border-none bg-btn-blue rounded-md text-white m-1.5 font-semibold cursor-pointer "
              type="button"
              onClick={close}
            >
              닫기
            </button>
            {openAlertModal && <AlertModal close={close} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinModal;
