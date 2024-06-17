import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import GatheringList from '../page/GatheringList';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          {/* <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail/:id" element={<DetailedPost />} /> */}
          <Route path="/gathering" element={<GatheringList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
