import MyPage from '@/components/myPage/MyPage';
import GatheringList from '@/pages/GatheringList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DefaultLayout from '../layout/DefaultLayout';
import DetailedPost from '../pages/DetailedPost';
import HomePage from '../pages/LoginPage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/LoginPage/SignupPage';
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
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/gathering" element={<GatheringList />} />
          <Route path="/detail/:id" element={<DetailedPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
