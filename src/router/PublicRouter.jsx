import { useAuthStore } from '@/zustand/loginstate.store';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRouter = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log(isAuthenticated);
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};
