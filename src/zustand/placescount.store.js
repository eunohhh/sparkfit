import { create } from 'zustand';
import supabase from '../../supabaseClient';

const fetchPlacesCount = async () => {
  const { data, error } = await supabase
    .from('Places')
    .select('id', { count: 'exact' })
    .in('id', supabase.from('Contracts').select('place_id'));

  if (error) {
    throw new Error(error.message);
  }

  return data.length;
};

export const usePlacesCount = create((set, get) => ({
  placesCount: 0,
  error: null,
  isPending: false,
  intervalId: null,
  fetchPlacesCount: async () => {
    set({ isPending: true });
    try {
      const count = await fetchPlacesCount();
      set({ placesCount: count, isPending: false });
    } catch (error) {
      set({ error: error.message, isPending: false });
    }
  },
  startFetching: () => {
    set({ isPending: true });
    const interval = setInterval(async () => {
      try {
        const count = await fetchPlacesCount();
        set({ placesCount: count, isPending: false });
      } catch (error) {
        set({ error: error.message, isPending: false });
      }
    }, 30000); // 30 초 간격으로 모집인원 체크

    set({ intervalId: interval }); 
  },
  stopFetching: () => {
    const state = get();
    clearInterval(state.intervalId); 
    set({ intervalId: null });
  }
}));
