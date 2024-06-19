import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function DefaultLayout() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Sidebar />
      <Outlet />
    </main>
  );
}
