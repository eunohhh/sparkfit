import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './../assets/logo.png';

import {
  RiArrowGoBackLine,
  RiGroupLine,
  RiHome2Line,
  RiLogoutBoxRLine,
  RiSearchLine,
  RiUser3Line,
  RiCloseFill
} from 'react-icons/ri';
import Modal from 'react-modal';
import supabase from '@/supabase';

export default function Sidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const openModal = () => {
    setActiveItem('검색');
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // 모달이 열릴 때 body에 overflow: hidden 스타일 적용
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'visible'; // 모달이 닫힐 때 body에 원래 스타일로 복원
  };

  const searchPlace = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { data, error } = await supabase
          .from('Places')
          .select()
          .or(`region.ilike.%${searchKeyword}%,sports_name.ilike.%${searchKeyword}%`);
        if (error) {
          console.log('error =>', error);
          return;
        }
        setSearchResults([...data]);
      } catch (error) {
        console.log('서버 통신 error => ', error);
      }
    },
    [searchKeyword]
  );
  console.log(searchResults);
  //Places테이블의 region과sports_name에서  searchQuery와 일치한거를 찾는거
  return (
    <>
      <div className="bg-white shadow-sidebarshaow fixed top-0 left-0 h-lvh w-20 justify-center items-center h-screen sm:flex hidden text-sm z-10">
        <div className="h-calc-full-minus-110 w-11 mx-auto flex flex-col justify-between">
          <div className="h-80 flex flex-col justify-between items-center">
            <h1 className="w-logowidth h-logoheight">
              <Link className="block size-full" to="/">
                <img className="size-full block" src={logo} alt="logo" />
              </Link>
            </h1>

            <ul className="h-60 flex flex-col justify-between items-center text-xs">
              <SidebarItem icon={RiSearchLine} text="검색" onClick={openModal} />
              <SidebarItem icon={RiGroupLine} text="모임" />
              <SidebarItem
                icon={RiArrowGoBackLine}
                text="뒤로가기"
                onClick={() => {
                  navigate(-1);
                }}
              />
            </ul>
          </div>

          <div className="h-36">
            <ul className="text-xs h-full flex flex-col justify-between items-center">
              <SidebarItem
                icon={RiUser3Line}
                text="내 계정"
                onClick={() => {
                  navigate('/mypage');
                }}
              />
              <SidebarItem
                icon={RiLogoutBoxRLine}
                text="로그아웃"
                onClick={() => {
                  //TODOS: 로그아웃함수 추가필요
                  navigate('/');
                }}
              />
            </ul>
          </div>
        </div>
      </div>

      <ul className="bg-white shadow-bottomsidebarshaow fixed bottom-0 left-0 w-full h-16 flex justify-around items-center sm:hidden text-sm z-10">
        <SidebarItem
          icon={RiHome2Line}
          text="홈"
          isActive={activeItem === '홈'}
          onClick={() => {
            setActiveItem('홈');
            navigate('/');
          }}
        />
        <SidebarItem
          icon={RiGroupLine}
          text="모임"
          isActive={activeItem === '모임'}
          onClick={() => {
            setActiveItem('모임');
          }}
        />
        <SidebarItem icon={RiSearchLine} text="검색" isActive={activeItem === '검색'} onClick={openModal} />
        <SidebarItem
          icon={RiUser3Line}
          text="내 계정"
          isActive={activeItem === '내 계정'}
          onClick={() => {
            setActiveItem('내 계정');
            navigate('/mypage');
          }}
        />
        <SidebarItem
          icon={RiLogoutBoxRLine}
          text="로그아웃"
          isActive={activeItem === '로그아웃'}
          onClick={() => {
            // TODOS: 로그아웃 함수 추가 필요
            setActiveItem('로그아웃');
            navigate('/');
          }}
        />
      </ul>
      <div className="sm:hidden absolute bottom-28 right-5  cursor-pointer w-14 h-14 bg-slate-300 rounded-full flex justify-center items-center z-10">
        <RiArrowGoBackLine
          className="w-5 h-5"
          text="뒤로가기"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="번개 검색 모달"
        className="modal fixed inset-0 flex items-center sm:left-60  z-50 "
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 z-40"
        shouldCloseOnOverlayClick={false}
      >
        <div className="bg-white p-6 rounded-lg max-w-full max-w-screen-md w-4/5 h-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Spark Fit 검색</h2>
            <button onClick={closeModal} className="w-iconwidth h-iconheight">
              <RiCloseFill className="w-full h-full" />
            </button>
          </div>
          <form onSubmit={searchPlace}>
            <div className="mb-4">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="지역명 또는 모임명을 입력하세요"
                className="px-3 py-2 border rounded w-full box-border"
                maxLength={20}
              />
            </div>
            <button type="submit" className="bg-customLoginButton text-white px-4 py-1 rounded box-border">
              검색
            </button>
          </form>
          <div className="mt-4 max-h-72 overflow-y-scroll text-xs">
            {searchResults.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {searchResults.map((item) => (
                  <li key={item.id} className="py-4 box-border">
                    <p className="text-base font-semibold">모임: {item.gather_name}</p>
                    <p className="text-gray-500 mt-2 mb-2">모집기한: {item.deadline}</p>
                    <p className="text-gray-700">
                      {item.texts.length > 100 ? `${item.texts.slice(0, 100)}...` : item.texts}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-gray-500">
                        <span>{item.region}</span> | <span>{item.sports_name}</span> |{' '}
                        <span>{item.created_at.slice(0, 10)}</span>
                      </div>
                      <button className="bg-customLoginButton text-white px-2 py-1 rounded box-border">상세보기</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

const SidebarItem = ({ icon: Icon, text, onClick, isActive }) => (
  <li className="cursor-pointer text-center" onClick={onClick}>
    <Icon className={`mx-auto w-iconwidth transition-all h-iconheight ${isActive ? 'text-customLoginButton' : ''}`} />
    <p className={`mt-1.5 transition-all ${isActive ? 'text-[#82C0F9]' : ''}`}>{text}</p>
  </li>
);
