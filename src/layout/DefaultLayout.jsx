import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function DefaultLayout() {
  return (
    <main>
      <Sidebar />
      <Outlet />
      {/* <Footer /> */}
    </main>
  );
}
