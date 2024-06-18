import React from 'react';
import styled from 'styled-components';
import UserInfo from './components/UserInfo';
import ClubList from './components/ClubList';

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
  display: flex;
`;

export const STSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  //더 띄우고 싶으면 갭 더주기~~
  gap: 1rem;

  // 여기 반응형으로 조절
  width: 100%;
  border: 1px solid black;

  // 테일 윈드일 때는 sm
  @media (max-width: 640px) {
    padding: 0.5 rem;
  }
`;

export default MyPage;
