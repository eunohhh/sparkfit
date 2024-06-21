import { useAuthStore } from '@/zustand/loginstate.store';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRouter = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Navigate to="/main" /> : <Outlet />;
};
