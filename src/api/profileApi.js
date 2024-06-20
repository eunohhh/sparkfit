import supabase from '@/supabase/supabaseClient';

// 로그인한 사용자 정보
export const loginUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data.user;
};

// 특정 사용자 정보
export const getUser = async (userId) => {
  const { data, error } = await supabase.from('Users').select('nickname').eq('user_id', userId).single();
  if (error) {
    console.error(error.message);
  }

  return data;
};
