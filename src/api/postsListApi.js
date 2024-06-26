import supabase from '@/supabase/supabaseClient';

export const getPost = async (id) => {
  const { data, error } = await supabase.from('Places').select('*').eq('id', id).single();

  if (error) {
    console.error(error.message);
  }

  return data;
};
