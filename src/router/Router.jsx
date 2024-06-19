import MyPage from '@/components/myPage/MyPage';
import GatheringList from '@/pages/GatheringList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '../pages/LoginPage/HomePage';
import NavermapScriptComponent from '../pages/MainPage/NavermapScriptComponent';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/LoginPage/SignupPage';
import DetailedPost from '../pages/DetailPage/DetailedPost';
import DefaultLayout from '../layout/DefaultLayout';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<NavermapScriptComponent />} />
          <Route path="/gathering" element={<GatheringList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail/:id" element={<DetailedPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
