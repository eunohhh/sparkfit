import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import LoginPage from '../page/LoginPage';
import SignupPage from '../page/SignupPage';
import HomePage from '../page/HomePage';
import NavermapScriptComponent from '../pages/MainPage/NavermapScriptComponent';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<NavermapScriptComponent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/join" element={<Join />} /> */}
          {/* <Route path="/mypage" element={<MyPage />} /> */}
          {/* <Route path="/detail/:id" element={<DetailedPost />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
