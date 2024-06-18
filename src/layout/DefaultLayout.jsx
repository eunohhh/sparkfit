import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function DefaultLayout() {
  return (
    <>
      {/* <Sidebar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}
