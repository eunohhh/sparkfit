import { create } from 'zustand';

const useMapStore = create((set) => ({
  selectedGeoData: null,
  setSelectedGeoData: (geoData) => set({ selectedGeoData: geoData })
}));

export default useMapStore;
