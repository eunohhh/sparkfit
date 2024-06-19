import supabase from '@/supabase';

export const getPost = async (id) => {
  const { data, error } = await supabase.from('Places').select('*').eq('id', id).single();

  if (error) {
    console.error(error.message);
  }

  return data;
};

export const inputPost = async () => {
  const { data, error } = await supabase
    .from('Places')
    .insert([{ some_column: 'someValue', other_column: 'otherValue' }])
    .select();

  if (error) {
    console.error(error.message);
  }
  return data;
};
