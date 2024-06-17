import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail/:id" element={<DetailedPost />} />
      </Route>
    </BrowserRouter>
  );
}
