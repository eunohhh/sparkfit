import { create } from 'zustand';

const useFilterStore = create((set) => ({
  selectedButton: 0,
  handleButtonSelect: (idx) => set({ selectedButton: idx })
}));
export default useFilterStore;
