import MyPage from '@/components/myPage/MyPage';
import GatheringList from '@/pages/GatheringPage/GatheringList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MyPage from '@/pages/MyPage/MyPage';
import DefaultLayout from '../layout/DefaultLayout';
import DetailedPost from '../pages/DetailPage/DetailedPost';
import HomePage from '../pages/LoginPage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/LoginPage/SignupPage';
import NavermapScriptComponent from '../pages/MainPage/NavermapScriptComponent';
import { PublicRouter } from './PublicRouter';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRouter />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<PublicRouter />}>
          <Route element={<DefaultLayout />}>
            <Route path="/main" element={<NavermapScriptComponent />} />
            <Route path="/gathering" element={<GatheringList />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/detail/:id" element={<DetailedPost />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
