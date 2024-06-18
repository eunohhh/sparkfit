import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import GatheringList from '../page/GatheringList';
import NavermapScriptComponent from '../pages/MainPage/NavermapScriptComponent';
import DefaultLayout from '../layout/DefaultLayout';
import DetailedPost from '../pages/DetailedPost';
import MyPage from '@/components/myPage/MyPage';


export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<NavermapScriptComponent />} />
            <Route path="/gathering" element={<GatheringList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/detail/:id" element={<DetailedPost />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
