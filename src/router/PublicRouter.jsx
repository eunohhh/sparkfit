import { useAuthStore } from '@/zustand/loginstate.store';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRouter = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuthToken = useAuthStore((state) => state.checkAuthToken);

  useEffect(() => {
    checkAuthToken();
  }, [checkAuthToken]);

  return isAuthenticated ? <Navigate to="/main" /> : <Outlet />;
};
