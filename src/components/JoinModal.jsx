import { useRef } from 'react';
import useOutsideClick from './useOutsideClick';
import SearchAddressApi from './SearchAddressApi';

const JoinModal = ({ close }) => {
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
          <h3>가입 신청서</h3>
        </div>

        <form>
          <div className="my-3 mx-3">
            <div className="flex flex-col">
              <label htmlFor="name" className="ml-1">
                이름
              </label>
              <input className="px-5 py-2.5 rounded-md m-1.5 font-semibold border" type="text" autoFocus />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="ml-1">
                전화번호
              </label>
              <input className="px-5 py-2.5 rounded-md m-1.5 font-semibold border" type="number" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="title" className="ml-1">
                생년월일
              </label>
              <input className="px-5 py-2.5 rounded-md m-1.5 font-semibold border" type="date" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="ml-1">
                이메일
              </label>
              <input className="px-5 py-2.5 rounded-md m-1.5 font-semibold border" type="email" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="title" className="ml-1">
                가입동기
              </label>
              <input className="px-5 py-2.5 rounded-md m-1.5 font-semibold border h-[300px]" type="textarea" />
            </div>
            <div>
              <label htmlFor="address">주소</label>
              <SearchAddressApi />
            </div>
          </div>
          <div className="flex justify-center items-center my-3">
            <button
              className=" text-base px-5 py-2.5 border-none bg-btn-blue rounded-md text-white m-1.5 font-semibold cursor-pointer "
              type="submit"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinModal;
