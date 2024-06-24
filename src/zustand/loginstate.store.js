import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useAuthStore = create(
  immer((set) => ({
    isAuthenticated: !!localStorage.getItem('sb-auth-token'),

    checkAuthToken: () => {
      set({ isAuthenticated: !!localStorage.getItem('sb-auth-token') });
    }
  }))
);
