import supabase from '@/supabase/supabaseClient';

class ContractsApi {
  constructor() {
    this.supabase = supabase;
  }

  async getContracts() {
    const { data, error } = await this.supabase.from('Contracts').select('*').order('created_at', { ascending: false });

    if (error) {
      console.log('error => ', error);
      throw new Error('가져오기 실패했다 => ', error);
    }

    return data;
  }
}

const contractsApi = new ContractsApi();

export default contractsApi;
