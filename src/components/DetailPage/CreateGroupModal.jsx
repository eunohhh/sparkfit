import { useRef } from 'react';
import useOutsideClick from './useOutsideClick';

const CreateGroupModal = ({ close }) => {
  // const [name, setName] = useState('');
  const modalRef = useRef(null);

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

        <form>
          <div className="my-3 mx-3">
            <div className="flex flex-col">
              <label htmlFor="Groupname" className="ml-1">
                모임명
              </label>
              <input className="px-5 py-2.5 rounded-md m-1.5 font-semibold border" type="text" autoFocus />
            </div>

            <div className="flex flex-col">
              <label htmlFor="sportsname" className="ml-1">
                스포츠명
              </label>
              <input className="px-5 py-2.5 rounded-md m-1.5 font-semibold border" type="text" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="deadline" className="ml-1">
                마감기한
              </label>
              <input className="px-5 py-2.5 rounded-md m-1.5 font-semibold border" type="date" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="ml-1">
                지역
              </label>
              <input className="px-5 py-2.5 rounded-md m-1.5 font-semibold border" type="address" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="content" className="ml-1">
                모임 설명
              </label>
              <input className="px-5 py-2.5 rounded-md m-1.5 font-semibold border h-[300px]" type="textarea" />
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
