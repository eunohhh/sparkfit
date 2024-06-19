import { create } from 'zustand';

const useMapStore = create((set) => ({
  selectedGeoData: null,
  userGps: null,
  setSelectedGeoData: (geoData) => set({ selectedGeoData: geoData }),
  setUserGps: (gps) => set({ userGps: gps })
}));

export default useMapStore;
