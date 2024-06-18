import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import GatheringList from '../pages/GatheringList';
import NavermapScriptComponent from '../pages/MainPage/NavermapScriptComponent';
import DetailedPost from '../pages/DetailedPost';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<NavermapScriptComponent />} />
          <Route path="/gathering" element={<GatheringList />} />
          <Route path="/detail/:id" element={<DetailedPost />} />
          {/* <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<MyPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
