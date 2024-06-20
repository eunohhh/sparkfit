import supabase from '@/supabase/supabaseClient';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

export const useUserStore = create((set) => ({
  userData: null,
  loading: true,
  error: null,
  signUp: async (email, password, nickname) => {
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname
          }
        }
      });
      if (signUpError) {
        throw new Error(signUpError.message);
      }
      const userId = signUpData.user.id;

      const { data: userData, error: userError } = await supabase
        .from('Users')
        .insert([{ user_id: userId, email, nickname }]);
      if (userError) {
        throw new Error(userError.message);
      }
      // 회원가입, 추가 정보 저장이 성공하면 데이터 상태 저장, 로딩 상태 해제
      set({ userData: signUpData, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: `Sign-up failed: ${error.message}` });
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw new Error(signOutError.message);
      set({ loading: false, userData: null, error: null });
      localStorage.removeItem('supabase.auth.token');
    } catch (error) {
      set({ loading: false, error: `Sign-out failed: ${error.message}` });
      throw error;
    }
  }
}));

export const useSignInStore = create(
  persist(
    (set) => ({
      userData: null,
      loading: true,
      error: null,
      signIn: async (email, password) => {
        try {
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
          if (signInError) {
            throw new Error(signInError);
          }
          set({ userData: signInData, loading: false, error: null });
        } catch (error) {
          set({ loading: false, error: `Sign-in failed: ${error.message}` });
          throw error;
        }
      }
    }),
    {
      name: 'sb-auth-token'
    }
  )
);
