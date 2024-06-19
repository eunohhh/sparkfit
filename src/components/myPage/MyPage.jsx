import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import ClubList from './ClubList';

const MyPage = () => {
  return (
    <STMyPageContainer>
      <STSection>
        <UserInfo />
        <ClubList />
      </STSection>
    </STMyPageContainer>
  );
};

const STMyPageContainer = styled.section`
  max-width: 1280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

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
    margin-left: 4rem;
  }

  @media (max-width: 1024px) {
    margin-left: 4rem;
  }
`;

export default MyPage;
