import { create } from 'zustand';

const useFilterStore = create((set) => ({
  selectedButton: 0,
  handleButtonSelect: (idx) => set((state) => ({ selectedButton: idx }))
}));
export default useFilterStore;
