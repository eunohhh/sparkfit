import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import DetailedPost from '../pages/DetailedPost';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          {/* <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/mypage" element={<MyPage />} /> */}
          <Route path="/detail/:id" element={<DetailedPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
