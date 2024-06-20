import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('sb-izvoqnbrmtyamauaimyt-auth-token'),

  checkAuthToken: () => {
    set({ isAuthenticated: !!localStorage.getItem('sb-izvoqnbrmtyamauaimyt-auth-token') });
  }
}));
