import { useEffect, useRef, useState } from 'react';
import useOutsideClick from './useOutsideClick';
import { v4 as uuidv4 } from 'uuid';
import supabase from '@/supabase/supabaseClient';
import { loginUser } from '@/api/profileApi';
import { useQuery } from '@tanstack/react-query';
import useMapStore from '@/zustand/map.store';
import { useShallow } from 'zustand/react/shallow';

const CreateGroupModal = ({ close }) => {
  const modalRef = useRef(null);

  const [groupName, setGroupName] = useState('');
  const [sportsName, setSportsName] = useState('');
  const [deadline, setDeadLine] = useState('');
  const [contents, setContents] = useState('');

  const { selectedGeoData } = useMapStore(
    useShallow((state) => ({ selectedGeoData: state.selectedGeoData, setUserGps: state.setUserGps }))
  );

  const [address, setAdderess] = useState('');

  useEffect(() => {
    if (selectedGeoData) {
      setAdderess(selectedGeoData.address.jibunAddress);
    } else {
      setAdderess('');
    }
  }, [selectedGeoData]);

  const { data: user } = useQuery({ queryKey: ['user'], queryFn: loginUser });

  const createGroupForm = async (e) => {
    e.preventDefault();
    const groupId = uuidv4();
    const { data, error } = await supabase
      .from('Places')
      .insert([
        {
          id: groupId,
          sports_name: sportsName,
          gather_name: groupName,
          deadline: deadline,
          region: address,
          texts: contents,
          created_by: user?.id,
          lat: selectedGeoData.coord.lat,
          long: selectedGeoData.coord.long
        }
      ])
      .select();

    if (error) {
      console.error(error.message);
      alert(`오류가 발생했습니다.`);
    } else {
      console.log(data);
      alert('생성 되었습니다');

      close();
    }
  };

  const handleClose = () => {
    close?.();
  };

  useOutsideClick(modalRef, handleClose);

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-10 z-50">
      <div
        className="h-auto rounded-lg w-[700px] bg-white absolute top-[-35%] left-1/2 transform -translate-x-1/2 - translate-y-1/2"
        ref={modalRef}
      >
        <div className="m-2 flex justify-center items-center">
          <h3>모임 생성</h3>
        </div>

        <form onSubmit={createGroupForm}>
          <div className="my-3 mx-3">
            <div className="flex flex-col">
              <label htmlFor="Groupname" className="ml-1">
                모임명
              </label>
              <input
                className="px-5 py-2.5 rounded-md m-1.5 font-semibold border"
                type="text"
                onChange={(e) => setGroupName(e.target.value)}
                value={groupName}
                autoFocus
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="sportsname" className="ml-1">
                스포츠명
              </label>
              <input
                className="px-5 py-2.5 rounded-md m-1.5 font-semibold border"
                type="text"
                onChange={(e) => {
                  setSportsName(e.target.value);
                }}
                value={sportsName}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="deadline" className="ml-1">
                마감기한
              </label>
              <input
                className="px-5 py-2.5 rounded-md m-1.5 font-semibold border"
                type="date"
                onChange={(e) => {
                  setDeadLine(e.target.value);
                }}
                value={deadline}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="ml-1">
                주소
              </label>
              <input
                className="px-5 py-2.5 rounded-md m-1.5 font-semibold border"
                type="address"
                onChange={(e) => {
                  setAdderess(e.target.value);
                }}
                value={address}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="content" className="ml-1">
                모임 설명
              </label>
              <input
                className="px-5 py-2.5 rounded-md m-1.5 font-semibold border h-[300px]"
                type="text"
                onChange={(e) => {
                  setContents(e.target.value);
                }}
                value={contents}
              />
            </div>
          </div>
          <div className="flex justify-center items-center my-3">
            <button
              className=" text-base px-5 py-2.5 border-none bg-btn-blue rounded-md text-white m-1.5 font-semibold cursor-pointer "
              type="submit"
            >
              생성
            </button>
            <button
              className=" text-base px-5 py-2.5 border-none bg-btn-blue rounded-md text-white m-1.5 font-semibold cursor-pointer "
              type="button"
              onClick={close}
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
