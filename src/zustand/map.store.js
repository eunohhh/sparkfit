import { create } from 'zustand';

const useMapStore = create((set) => ({
  selectedCoord: null,
  setSelectedCoord: (coord) => set({ selectedCoord: coord })
}));

export default useMapStore;
