import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pagess/LoginPage/LoginPage';
import SignupPage from '../pages/LoginPage/SignupPage';
import HomePage from '../pages/LoginPage/HomePage';
import NavermapScriptComponent from '../pages/MainPage/NavermapScriptComponent';
import GatheringList from '@/pages/GatheringList';
import MyPage from '@/components/myPage/MyPage';
import DefaultLayout from '../layout/DefaultLayout';
import DetailedPost from '../pages/DetailedPost';

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
