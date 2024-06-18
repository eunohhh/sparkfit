import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import ClubList from './ClubList';

const MyPage = () => {
  useEffect(() => {}, []);

  return (
    <STMyPageContainer>
      <h1>마이페이지~~</h1>
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
  //더 띄우고 싶으면 갭 더주기~~
  gap: 1rem;

  // 여기 반응형으로 조절
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
