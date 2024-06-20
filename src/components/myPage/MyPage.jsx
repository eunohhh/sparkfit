import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import ClubList from './ClubList';

const MyPage = () => {
  return (
    <section className="max-w-[1280px] h-[100vh] flex flex-col mt-4 mx-auto">
      <section className="flex flex-col p-2 gap-4 w-full sm:p-1 mx-auto md:p-4 ml-4 lg:ml-6">
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
    padding: 0.5rem;
    margin: 0 auto;
  }
  //md, lg 1024px  ,768px
  @media (max-widt: 768px) {
    pad: 1rem;
    margin-left: 4rem;
  }

  @media (max-width: 1024px) {
    margin-left: 6rem;
  }
`;

export default MyPage;
