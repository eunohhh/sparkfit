import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyPage from '../components/myPage/MyPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<DefaultLayout />}>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} /> */}
        <Route path="/mypage" element={<MyPage />} />
        {/* <Route path="/detail/:id" element={<DetailedPost />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
