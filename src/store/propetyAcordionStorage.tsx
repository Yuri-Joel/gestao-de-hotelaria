import { create } from 'zustand';

interface PropertyStore {
  name: string;
  category: string;
  step: 'first' | 'second' | 'validation';
  
  setName: (name: string) => void;
  setCategory: (category: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetStore: () => void;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  name: '',
  category: '',
  step: 'first',

  setName: (name) => set({ name }),
  setCategory: (category) => set({ category }),
  
  nextStep: () => set((state) => {
    switch(state.step) {
      case 'first':
        return { step: 'second' };
      case 'second':
        return { step: 'validation' };
      default:
        return { step: 'first' };
    }
  }),

  previousStep: () => set((state) => {
    switch(state.step) {
      case 'validation':
        return { step: 'first' };
      case 'second':
        return { step: 'first' };
      default:
        return { step: 'first' };
    }
  }),

  resetStore: () => set({ 
    name: '', 
    category: '', 
    step: 'first' 
  })
}));