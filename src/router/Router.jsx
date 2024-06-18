import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import NavermapScriptComponent from '../pages/MainPage/NavermapScriptComponent';
import DefaultLayout from '../layout/DefaultLayout';
import DetailedPost from '../pages/DetailedPost';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<NavermapScriptComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/detail/:id" element={<DetailedPost />} />
          </Route>
        </Routes>
      </Routes>
    </BrowserRouter>
  );
}
