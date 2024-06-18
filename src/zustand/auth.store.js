import supabase from '@/supabase/supabaseClient';
import { create } from 'zustand';

export const useSignUpStore = create((set) => ({
  //상태 초기값 설정: 회원가입 성공 후 반환되는 Data 두가지,로딩 상태,오류
  signUpData: null,
  userData: null,
  loading: false,
  error: null,
  //signUp 함수가 호출되면 상태 변경 = 로딩 true, 이전 오류 초기화
  signUp: async (email, password, nickname) => {
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        throw new Error(signUpError.message);
      }
      const userId = signUpData.user.id;

      // 추가 정보 저장
      const { data: userData, error: userError } = await supabase
        .from('Users')
        .insert([{ user_id: userId, email, nickname }]);
      if (userError) {
        throw new Error(userError.message);
      }
      // 회원가입, 추가 정보 저장이 성공하면 데이터 상태 저장, 로딩 상태 해제
      set({ signUpData, userData, loading: false });
    } catch (error) {
      set({ loading: false, error: `Sign-up failed: ${error.message}` });
    }
  }
}));

export const useSignInStore = create((set) => ({
  signInData: null,
  loading: false,
  error: null,
  signIn: async (email, password) => {
    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        throw new Error(signInError.message);
      }

      return signInData.user;
    } catch (error) {
      set({ loading: false, error: `Sign-up failed: ${error.message}` });
    }
  }
}));

// async signOut() {
//     try {
//       const { error: signOutError } = await supabase.auth.signOut();
//       if (signOutError) throw new Error(signOutError.message);
//     } catch (error) {
//       throw new Error(`Sign-out failed: ${error.message}`);
//     }
//   }
