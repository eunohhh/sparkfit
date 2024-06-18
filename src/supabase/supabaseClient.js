import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_KEY);

export default supabase;
