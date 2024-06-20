import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import ClubList from './ClubList';

const MyPage = () => {
  return (
    <section className="max-w-[1280px] h-[100vh] flex flex-col mt-4 mx-auto">
      <div className="flex flex-col p-2 gap-4 w-full sm:p-1 mx-auto md:p-4 ml-4 lg:ml-6">
        <UserInfo />
        <ClubList />
      </div>
    </section>
  );
};

export default MyPage;
