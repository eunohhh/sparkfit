import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../assets/logo.png';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { RiSearchLine } from 'react-icons/ri';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { RiUser3Line } from 'react-icons/ri';
import { RiGroupLine } from 'react-icons/ri';
export default function Sidebar() {
  return (
    <>
      <div className="bg-white shadow-sidebarshaow fixed top-0 left-0 h-lvh w-16 flex justify-center items-center h-screen">
        <div className="h-5/6 w-11 mx-auto flex flex-col justify-between">
          <div className="h-80 flex flex-col justify-between items-center">
            <h1 className="w-logowidth">
              <Link className="block w-logowidth" to="/">
                <img className="w-logowidth block" src={logo} alt="logo" />
              </Link>
            </h1>

            <ul className="h-60 flex flex-col justify-between items-center text-xs">
              <li>
                <RiSearchLine className="mx-auto w-iconwidth h-iconheight" />
                <p>검색</p>
              </li>
              <li>
                <RiGroupLine className="mx-auto w-iconwidth h-iconheight" />
                <p>모임</p>
              </li>
              <li>
                <div>
                  <RiArrowGoBackLine className="mx-auto w-iconwidth h-iconheight" />
                  <p>뒤로가기</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <li>
                <RiUser3Line />내 계정
              </li>
              <li>
                <RiLogoutBoxRLine />
                로그아웃
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
