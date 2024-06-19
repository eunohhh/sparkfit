import supabase from '@/supabase';

export const profileApi = async (id) => {
  const { data, error } = await supabase.from('Users').select('*').eq('user_id', id).single();

  if (error) {
    console.error(error.message);
  }

  return data;
};
