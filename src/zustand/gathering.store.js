import { create } from 'zustand';

export const useGatheringStore = create((set) => ({
  userLocation: null,
  sortedPlace: [],
  loading: true,
  setUserLocation: (location) => set({ userLocation: location }),
  setSortedPlace: (places) => set({ sortedPlace: places }),
  setLoading: (loading) => set({ loading })
}));
