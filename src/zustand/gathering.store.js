import { create } from 'zustand';

export const useGatheringStore = create((set) => ({
  sortedPlace: [],
  loading: true,
  setSortedPlace: (places) => set({ sortedPlace: places }),
  setLoading: (loading) => set({ loading })
}));
