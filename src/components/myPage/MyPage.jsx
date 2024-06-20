import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import ClubList from './ClubList';

const MyPage = () => {
  return (
    <section className="max-w-screen-xl flex flex-col mx-auto lg:w-[75%] lg:mx-auto md:w-[75%] md:mx-0px auto; md:ml-[110px]  sm:w-[80%] sm:mx-auto sm:ml-[100px] min-[320px]:w-[80%]">
      <section className="flex flex-col p-2 gap-4 w-full sm:p-1 mx-auto md:p-4 ">
        <UserInfo />
        <ClubList />
      </section>
    </section>
  );
};

export const STSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  gap: 1rem;
  width: 100%;

  // 테일 윈드일 때는 sm
  @media (max-width: 640px) {
    /* padding: 0.5rem;
    margin: 0 auto; */
  }
  //md, lg 1024px  ,768px
  @media (max-widt: 768px) {
    /* pad: 1rem;
    margin-left: 4rem; */
  }

  @media (max-width: 1024px) {
    /* margin-left: 6rem; */
  }
`;

export default MyPage;
