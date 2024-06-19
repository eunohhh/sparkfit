import { useState } from 'react';
import {
  RiArrowGoBackLine,
  RiGroupLine,
  RiHome2Line,
  RiLogoutBoxRLine,
  RiSearchLine,
  RiUser3Line
} from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import logo from './../assets/logo.png';
import { useSignOutStore } from '@/zustand/auth.store';
import Swal from 'sweetalert2';

export default function Sidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');
  const signOut = useSignOutStore((state) => state.signOut);

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
              <SidebarItem icon={RiSearchLine} text="검색" />
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
                onClick={async () => {
                  try {
                    await signOut();
                    Swal.fire({
                      title: '로그아웃 완료!',
                      icon: 'success'
                    });
                    navigate('/login');
                  } catch (error) {
                    console.error('Sign-out failed', error);
                  }
                }}
              />
            </ul>
          </div>
        </div>
      </div>

      <ul className="bg-white shadow-bottomsidebarshaow fixed bottom-0 left-0 w-full h-16 flex justify-around items-center sm:hidden text-sm">
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
        <SidebarItem
          icon={RiSearchLine}
          text="검색"
          isActive={activeItem === '검색'}
          onClick={() => {
            setActiveItem('검색');
          }}
        />
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
          onClick={async () => {
            try {
              await signOut();
              setActiveItem('로그아웃');
              Swal.fire({
                title: '로그아웃 완료!',
                icon: 'success'
              });
              navigate('/login');
            } catch (error) {
              console.error('Sign-out failed', error);
            }
          }}
        />
      </ul>
      <div className="sm:hidden absolute bottom-28 right-5  cursor-pointer w-14 h-14 bg-slate-300 rounded-full flex justify-center items-center">
        <RiArrowGoBackLine
          className="w-5 h-5"
          text="뒤로가기"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </>
  );
}

const SidebarItem = ({ icon: Icon, text, onClick, isActive }) => (
  <li className="cursor-pointer text-center" onClick={onClick}>
    <Icon className={`mx-auto w-iconwidth transition-all h-iconheight ${isActive ? 'text-[#82C0F9]' : ''}`} />
    <p className={`mt-1.5 transition-all ${isActive ? 'text-[#82C0F9]' : ''}`}>{text}</p>
  </li>
);
