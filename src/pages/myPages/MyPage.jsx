import React from 'react';
import styled from 'styled-components';
import UserInfo from './components/UserInfo';
import ClubList from './components/ClubList';

const MyPage = () => {
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
  }
`;

export default MyPage;
